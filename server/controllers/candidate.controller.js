import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import Resume from "../models/resume.model.js";
import triggerAIMatching from "../services/aiMatching.service.js";

// external jobs

const getInternalJobs = async (req, res) => {
    try {
        const userId = req.user.uid;
        if(!userId){
            return res.status(400).json({message: "Unauthorized Login/Token not found"});
        }

        let user = await User.findOne({firebaseUid: userId});

        // Get job IDs the candidate has already applied to
        const appliedApplications = user
            ? await Application.find({candidateId: user._id}).select("jobId")
            : [];
        const appliedJobIds = appliedApplications.map(app => app.jobId);

        let jobs = await Job.find({_id: {$nin: appliedJobIds}}).sort({createdAt: -1});
        if(jobs.length === 0){
            return res.status(200).json({
                message: "No jobs listed",
                jobs: []
            })
        }

        return res.status(200).json({
            message: "Jobs fetched successfully",
            jobs
        })
    } catch (error) {
        console.log("Error in fetching jobs ", error);
        return res.status(400).json({message: "Error in fetching jobs"});
    }

}

const getScheduledInterviews = async (req, res) => {
    try {
        const userId = req.user.uid;
        if(!userId){
            return res.status(400).json({message: "Unauthorized Login/Token not found"});
        }
        let user = await User.findOne({firebaseUid: userId});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);

        let interviews = await Interview.find({
                                            candidateId: user._id,
                                            scheduledAt: {$gte: sixHoursAgo}
                                        })
                                        .populate("ApplicationId")
                                        .populate("candidateId")
                                        .populate("recruiterId")
                                        .populate("JobId")
                                        .sort({scheduledAt: -1});
        if(interviews.length === 0){
            return res.status(200).json({
                message: "No Interviews Scheduled",
                interviews: []
            });
        }
        return res.status(200).json({
            message: "Scheduled interviews fetched successfully",
            interviews
        });

    } catch (error) {
        console.error("Error fetching interviews:", error);
        return res.status(500).json({
            message: "Internal server error"
        });

    }
}

const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.uid;
        if(!userId){
            return res.status(400).json({message: "Unauthorized Login/Token not found"});
        }
        let user = await User.findOne({firebaseUid: userId});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        let applications = await Application
                .find({candidateId: user._id})
                .populate("jobId")
                .sort({createdAt: -1});

        if(applications.length === 0){
            return res.status(200).json({
                message: "No jobs listed",
                applications: []
            })
        }

        return res.status(200).json({
            message: "Applied Jobs fetched successfully",
            applications
        })

    } catch (error) {
        console.log("Error in fetching jobs ", error);
        return res.status(400).json({message: "Error in fetching jobs"});
    }
}


const applyJob = async (req, res) => {
    try {
        const userId = req.user.uid;
        const {jobId} = req.body;
        if(!jobId){
            return res.status(400).json({message: "Job Id required"});
        }

        const job = await Job.findById(jobId);
        const job_text = job.description;
        
        if(!userId){
            return res.status(400).json({message: "Unauthorized Login/Token not found"});
        }
        let user = await User.findOne({firebaseUid: userId});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        let resume = await Resume.findOne({userId: user._id});
        if(!resume){
            return res.status(400).json({message: "Error in fetching Resume"});
        }

        let newApplication = await Application.create({
            candidateId: user._id,
            jobId,
            resume: resume._id,
            status: "submitted",
        })
        
        if (!resume.embedding_vectorId) {
            console.log("Resume not yet vectorized, skipping AI matching.");
        } else {
            console.log("before resume matching")
            triggerAIMatching({
                applicationId: newApplication._id.toString(),
                job_text,
                resumeId: resume.embedding_vectorId
            });
            console.log("after resume matching")
        }

        return res.status(200).json({message: "Applied for job successfully"});

    } catch (error) {
        console.log("Error in applying job ", error);
        return res.status(400).json({message: "Error in applying job"});
    }


}

export {getInternalJobs, getScheduledInterviews, getAppliedJobs, applyJob};

