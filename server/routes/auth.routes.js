import { Router } from "express";
import {login, signUpCandidate, signUpRecruiter, logout, refreshSession} from "../controllers/auth.controller.js";
import verifyIdToken from "../middleware/firebase.middleware.js";
import uploadResume from "../middleware/resumeUpload.middleware.js";

const authRouter = Router();

authRouter.route("/login").post(verifyIdToken, login);
authRouter.route("/signUpCandidate").post(verifyIdToken, uploadResume.single("resume"), signUpCandidate);
authRouter.route("/signUpRecruiter").post(verifyIdToken, signUpRecruiter);
authRouter.route("/refresh-session").post(verifyIdToken, refreshSession);
authRouter.route("/logout").post(verifyIdToken, logout);

export {authRouter};