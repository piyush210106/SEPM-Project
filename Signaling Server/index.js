import { Server } from "socket.io";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 8001;

const io = new Server(PORT, {
    cors: {
    origin: [
      "http://localhost:5173",
      "https://projects-nlv9.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

console.log(`Signaling server running on port ${PORT}`);

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = {
      userId: decoded.userId,
      roomId: decoded.roomId,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return next(new Error("Invalid or expired token"));
  }
});

io.on("connection", (socket) => {
  const { roomId, role } = socket.user;

  console.log(`${role} connected to room ${roomId}`);

  // Join interview room
  socket.join(roomId);

  // Notify other peer
  socket.to(roomId).emit("peer-joined", { role });

  socket.on("offer", (offer) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice-candidate", (candidate) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log(`${role} disconnected from room ${roomId}`);
    socket.to(roomId).emit("peer-left", { role });
  });
});