import Interview from "../models/interview.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const joinInterview = async (req, res) => {
    try {
        const {interviewId} = req.body;
        const userId = req.user.uid;

        if(!interviewId){
            return res.status(400).json({message: "InterviewId required"});
        }

        const interview = await Interview.findById(interviewId);
        if(!interview){
            return res.status(400).json({message: "Interview Not found"});
        }

        let user = await User.findOne({firebaseUid: userId});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        let role = null;
        if(interview.candidateId.toString() === user._id.toString()) role = "candidate";
        if(interview.recruiterId.toString() === user._id.toString()) role = "recruiter";

        if(!role){
            return res.status(400).json({message: "Not authorized to join room"});
        }

        const token = jwt.sign(
        {
            interviewId: interview._id,
            roomId: interview.videoCallRoom.roomId,
            role,
            userId: user._id
        },
            process.env.JWT_SECRET,
        { expiresIn: "15m" } 
        );

        return res.status(200).json({
            roomId: interview.videoCallRoom.roomId,
            signalingServerUrl: process.env.SIGNALING_SERVER_URL,
            token,
            role
        });


    } catch (error) {
        console.log("Error in joining room ",error);
        return res.status(400).json({message: "Error joining interview"});
    }

}

export {joinInterview}; 