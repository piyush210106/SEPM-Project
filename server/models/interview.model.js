import mongoose, { mongo } from "mongoose";

const interviewSchema = new mongoose.Schema({
    ApplicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true,
        index: true
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    JobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    scheduledAt: {
        type: Date,
        required: true,
        index: true
    },
    videoCallRoom: {
        roomId: {
            type: String,
            default: null
        },
        roomUrl: {
            type: String,
            default: null
        },
        signalingServerUrl: {
            type: String,
            default: null
        }
    },
    feedback: {
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        technicalSkills: {
            type: Number,
            min: 1,
            max: 5
        },
        communication: {
            type: Number,
            min: 1,
            max: 5
        },
        problemSolving: {
            type: Number,
            min: 1,
            max: 5
        },
        culturalFit: {
            type: Number,
            min: 1,
            max: 5
        },
        strengths: [{
            type: String
        }],
        weaknesses: [{
            type: String
        }],
        decision: {
            type: String,
            enum: ['proceed', 'reject', 'pending'],
            default: 'pending'
        },
    },
    }, {
    timestamps: true
});

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;