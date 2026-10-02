import { useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

export const useWebRTC = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const socketRef = useRef(null);
  const peerRef = useRef(null);

  const [connected, setConnected] = useState(false);

  const startCall = async ({ roomId, signalingServerUrl, token, role }) => {

    // get camera + mic first
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    // connect socket
    socketRef.current = io(signalingServerUrl, {
      auth: { token }
    });

    // create peer connection
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });

    // add tracks
    stream.getTracks().forEach(track => {
      peerRef.current.addTrack(track, stream);
    });

    // receive remote stream
    peerRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // ICE candidate
    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          roomId,
          candidate: event.candidate
        });
      }
    };

    // join room after everything is set up
    socketRef.current.emit("join-room", { roomId });

    // When the other peer joins, the candidate (caller) creates the offer
    socketRef.current.on("peer-joined", async () => {
      if (role === "candidate" && peerRef.current) {
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socketRef.current.emit("offer", { roomId, offer });
      }
    });

    // receive offer (recruiter side)
    socketRef.current.on("offer", async ({ offer }) => {
      if (!peerRef.current) return;
      await peerRef.current.setRemoteDescription(offer);
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      socketRef.current.emit("answer", { roomId, answer });
    });

    // receive answer (candidate side)
    socketRef.current.on("answer", async ({ answer }) => {
      if (!peerRef.current) return;
      await peerRef.current.setRemoteDescription(answer);
    });

    // ice candidate receive
    socketRef.current.on("ice-candidate", async ({ candidate }) => {
      if (!peerRef.current) return;
      await peerRef.current.addIceCandidate(candidate);
    });

    // Handle peer leaving
    socketRef.current.on("peer-left", () => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
      setConnected(false);
    });

    // If candidate joins and the recruiter is already in the room,
    // the server will emit peer-joined to the candidate as well.
    // But if the candidate is first, they wait for peer-joined.
    // If both are in the room already (e.g. recruiter joined first),
    // the candidate should also send an offer on initial connect.
    if (role === "candidate") {
      // Small delay to allow the server to process join-room
      // and notify us if the peer is already there
      setTimeout(async () => {
        if (peerRef.current && peerRef.current.signalingState === "stable" && !peerRef.current.remoteDescription) {
          const offer = await peerRef.current.createOffer();
          await peerRef.current.setLocalDescription(offer);
          socketRef.current.emit("offer", { roomId, offer });
        }
      }, 1000);
    }

    setConnected(true);
  };

  const toggleAudio = useCallback(async (muted) => {
    if (!localStreamRef.current) return;

    if (muted) {
      // Stop audio track to fully release mic
      localStreamRef.current.getAudioTracks().forEach(track => track.stop());
    } else {
      // Re-acquire mic
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const newAudioTrack = newStream.getAudioTracks()[0];

        const oldAudioTrack = localStreamRef.current.getAudioTracks()[0];
        if (oldAudioTrack) localStreamRef.current.removeTrack(oldAudioTrack);
        localStreamRef.current.addTrack(newAudioTrack);

        // Replace track in peer connection
        if (peerRef.current) {
          const sender = peerRef.current.getSenders().find(s => s.track?.kind === "audio" || (!s.track && s.kind === "audio"));
          if (sender) {
            await sender.replaceTrack(newAudioTrack);
          }
        }
      } catch (err) {
        console.error("Failed to restart mic", err);
      }
    }
  }, []);

  const toggleVideo = useCallback(async (camOff) => {
    if (!localStreamRef.current) return;

    if (camOff) {
      // Stop the video track to release camera hardware (turns off indicator light)
      localStreamRef.current.getVideoTracks().forEach(track => track.stop());
    } else {
      // Re-acquire camera
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const newVideoTrack = newStream.getVideoTracks()[0];

        // Replace track in the stream
        const oldVideoTrack = localStreamRef.current.getVideoTracks()[0];
        if (oldVideoTrack) localStreamRef.current.removeTrack(oldVideoTrack);
        localStreamRef.current.addTrack(newVideoTrack);

        // Replace track in peer connection so remote side sees it
        if (peerRef.current) {
          const sender = peerRef.current.getSenders().find(s => s.track?.kind === "video" || (!s.track && s.kind === "video"));
          if (sender) {
            await sender.replaceTrack(newVideoTrack);
          }
        }

        // Update local video element
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
        }
      } catch (err) {
        console.error("Failed to restart camera", err);
      }
    }
  }, []);

  const cleanup = () => {
    // Stop local camera + mic using the stored stream ref
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    // Also clear video element srcObject
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    // Stop remote stream
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      remoteVideoRef.current.srcObject = null;
    }

    // Close peer connection
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    // Disconnect socket
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    setConnected(false);
  };

  return {
    localVideoRef,
    remoteVideoRef,
    localStreamRef,
    startCall,
    connected,
    cleanup,
    toggleAudio,
    toggleVideo
  };
};
