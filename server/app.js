import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {authRouter} from "./routes/auth.routes.js";
import {candidateRouter} from "./routes/candidate.routes.js";
import {recruiterRouter} from "./routes/recruiter.routes.js";
import { interviewRouter } from "./routes/interview.routes.js";

const app = express();
app.use(cors({
    origin: ["http://localhost:5173","https://projects-nlv9.vercel.app"],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/candidate", candidateRouter);
app.use("/recruiter", recruiterRouter);
app.use("/interview", interviewRouter);

export default app;