import { Router } from "express";
import {getInternalJobs, 
        getScheduledInterviews, 
        getAppliedJobs, 
        applyJob} from "../controllers/candidate.controller.js";
import verifyIdToken from "../middleware/firebase.middleware.js";

const candidateRouter = Router();

candidateRouter.route("/getinjobs").get(verifyIdToken, getInternalJobs);
candidateRouter.route("/getexjobs").get(verifyIdToken, getInternalJobs);
candidateRouter.route("/getappliedjobs").get(verifyIdToken, getAppliedJobs);
candidateRouter.route("/getinterviews").get(verifyIdToken, getScheduledInterviews);
candidateRouter.route("/applyjob").post(verifyIdToken, applyJob);

export {candidateRouter}
