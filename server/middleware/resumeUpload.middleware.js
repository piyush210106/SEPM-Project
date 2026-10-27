import multer from "multer";

const storage = multer.memoryStorage();

const uploadResume = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only PDF or DOCX allowed"));
    }

    cb(null, true);
  },
});

export default uploadResume;