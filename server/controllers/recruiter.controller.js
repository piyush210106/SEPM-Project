import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import Interview from "../models/interview.model.js";
import {v4 as uuidv4} from "uuid";

const addJob = async(req, res) => {
    try {
        const jobData = req.body;
        const {uid} = req.user;

        let user = await User.findOne({firebaseUid: uid});
        if(!user) return res.status(400).json({message: "Invalid User"});

        let newJob = await Job.create({
            title: jobData.title,
            company: user.profile.company,
            department: jobData.department,
            description: jobData.description,
            requirements: jobData.requirements,
            responsibilities: jobData.responsibilities,
            qualifications: jobData.qualifications,
            location: jobData.location,
            salary: jobData.salary,
            employmentType: jobData.employmentType,
            postedBy: user._id,
            openings: jobData.openings
        })
        return res.status(200).json({message: "Job successfully added!!"});
    } catch (error) {
        console.log("Error in adding job", error);
        return res.status(400).json({message: "Error in adding job"});
    }
}

const scheduleInterview = async(req, res) => {

    try {
        const {applicationId, data} = req.body;
        const interviewDateTime = data.dateTime ? new Date(data.dateTime) : new Date(`${data.date}T${data.time}`);

        if(!applicationId || !data.date || !data.time){
                return res.status(400).json({message: "Missing Fields"});
        }

        let application = await Application.findById(applicationId)
                                .populate("candidateId")
                                .populate("jobId");
        if(!application){ 
            return res.status(400).json({message: "Invalid application Id"});
        }
        const recruiterId = application.jobId.postedBy.toString();


        const existingInterview = await Interview.findOne({ApplicationId: applicationId})
        if(existingInterview){
            return res.status(400).json({message: "Interview already exists"});
        }

        let roomId = `interview_${uuidv4()}`;

        const roomUrl = `${process.env.FRONTEND_URL}/interview/${roomId}`;

        let interview = await Interview.create({
            ApplicationId: applicationId,
            candidateId: application.candidateId._id,
            recruiterId: recruiterId,
            JobId: application.jobId._id,
            scheduledAt: interviewDateTime,
            videoCallRoom: {
                roomId,
                roomUrl,
            }
        });
        return res.status(200).json({message: "Interview Scheduled"});

    } catch (error) {
        console.log("Error in scheduling interview ", error);
        return res.status(400).json({message:"Error in scheduling interview"});
    }
}

const getApplications = async (req, res) => {
    try {
        const userId = req.user.uid;
        if(!userId){
            return res.status(400).json({message: "Unauthorized Login/Token not found"});
        }
        let user = await User.findOne({firebaseUid: userId});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        // Get application IDs that already have interviews scheduled
        const scheduledInterviews = await Interview.find().select("ApplicationId");
        const scheduledAppIds = scheduledInterviews.map(i => i.ApplicationId.toString());

        const applications = await Application.find()
            .populate({
                path: "jobId",
                match: { postedBy: user._id },
            })
            .populate("candidateId")
            .populate("resume")
            .exec();
        const filteredApplications = applications.filter(app =>
            app.jobId &&
            app.jobId.postedBy.toString() !== userId &&
            !scheduledAppIds.includes(app._id.toString())
        );
            return res.status(200).json({
                message: "Required Applications",
                filteredApplications
            });

    } catch (error) {
        console.log("Error in fetching applications ", error);
        return res.status(400).json({message: "Error in fetching applications"});
    }
}

const getInterviews = async (req, res) => {
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
                                            recruiterId: user._id,
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
            message: "Required Interviews Scheduled",
            interviews
        });
    } catch (error) {
        console.error("Error fetching interviews:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export {addJob, scheduleInterview, getApplications, getInterviews};


