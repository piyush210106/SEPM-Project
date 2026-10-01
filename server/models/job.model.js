import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    company: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    department: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String,
        trim: true
    }],
    responsibilities: [{
        type: String,
        trim: true
    }],
    qualifications: {
        education: {
            type: String,
            trim: true
        },
        experienceYears: {
            type: Number,
            min: 0
        }
    },
    location: {
        city: String,
        state: String,
        country: String,
        remote: {
            type: Boolean,
            default: false
        },
        hybrid: {
            type: Boolean,
            default: false
        }
    },
    salary: {
        min: {
            type: Number,
            min: 0
        },
        max: {
            type: Number,
            min: 0
        },
        currency: {
            type: String,
            default: 'USD'
        }
    },
    employmentType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary'],
        default: 'full-time'
    },
    externalLink: {
        type: String, // For external job postings
        default: null
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    openings: {
        type: Number,
        default: 1,
        min: 1
    },
    }, {timestamps: true}
);


const Job = mongoose.model("Job", jobSchema);
export default Job;