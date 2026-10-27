import { Router } from "express";
import {addJob, scheduleInterview, getApplications, getInterviews}
 from "../controllers/recruiter.controller.js";
import verifyIdToken from "../middleware/firebase.middleware.js";

const recruiterRouter = Router();

recruiterRouter.route("/addjob").post(verifyIdToken, addJob);
recruiterRouter.route("/getapplications").get(verifyIdToken, getApplications);
recruiterRouter.route("/getinterviews").get(verifyIdToken, getInterviews);
recruiterRouter.route("/scheduleinterview").post(verifyIdToken, scheduleInterview);

export {recruiterRouter};