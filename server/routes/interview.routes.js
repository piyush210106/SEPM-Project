import {Router} from "express";
import verifyIdToken from "../middleware/firebase.middleware.js";
import { joinInterview } from "../controllers/interview.controller.js";

const interviewRouter = Router();

interviewRouter.route("/join").post(verifyIdToken, joinInterview);

export {interviewRouter};