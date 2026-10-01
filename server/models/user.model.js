import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter', 'admin'],
        required: true,
        default: 'candidate'
    },
    profile: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        resumeUrl: {
            type: String, 
            default: null
        },
        linkedinUrl: {
            type: String,
            default: null
        },
        //for Recruiters 
        company: {
            type: String,
            trim: true
        },
        position: {
            type: String,
            trim: true
        },
        department: {
            type: String,
            trim: true
        }
  },
})

const User = mongoose.model("User", userSchema);
export default User;