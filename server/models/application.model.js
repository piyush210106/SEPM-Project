import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
        index: true
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: [
        'submitted',
        'rejected',
        'interview_scheduled',
        'interview_completed',
        'offer_extended',
        'offer_accepted',
        'offer_rejected',
        'hired',
        'withdrawn'
        ],
        default: 'submitted',
        index: true
    },
    aiScore: {
        score: {
            type: Number,
            min: 0,
            max: 100,
            default: null
        },
        analysis: {
            type: String,
            default: null
        },
        matchedSkills: [{
            type: String
        }],
        missingSkills: [{
            type: String
        }],
        recommendations: {
            type: String,
            default: null
        },
        overallFit: {
            type: String,
            enum: ['Excellent', 'Good', 'Fair', 'Poor'],
            default: null
        },
    },
    rating: {
        technical: {
            type: Number,
            min: 1,
            max: 5
        },
        communication: {
            type: Number,
            min: 1,
            max: 5
        },
        cultural: {
            type: Number,
            min: 1,
            max: 5
        },
        overall: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    rejectionReason: {
        type: String,
        default: null
    },
    }, {
    timestamps: true
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;