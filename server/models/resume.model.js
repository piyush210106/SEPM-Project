import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    firebaseUid: {
      type: String,
      required: true,
      index: true,
    },
    processing_status:{
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    url: {
        type: String,
        required: true,
    },
    storagePath: {
        type: String,
        required: true,
    },
    extractedText: {
      type: String,
    },

    features: {
      skills: {
        type: [String],
        default: [],
        index: true,
      },

      experienceYears: {
        type: Number,
        default: 0,
      },

      education: [
        {
          degree: String,
          field: String,
          institution: String,
          graduationYear: Number,
        },
      ],

      jobTitles: {
        type: [String],
        default: [],
      },

      summary: {
        type: String, 
      },
    },
    embedding_vectorId: {
        type: String, 
    }

  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
