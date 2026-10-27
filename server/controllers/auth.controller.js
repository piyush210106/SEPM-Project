import {admin} from "../config/firebase.config.js";
import User from "../models/user.model.js";
import {bucket} from "../config/firebase.config.js";
import Resume from "../models/resume.model.js";
import triggerAIprocessing from "../services/resumeParsing.service.js";

const login = async(req, res) => {
    try {
        console.log("login begins");
        const {uid, email, idToken} = req.user;
        const {role} = req.body;
        

        let user = await User.findOne({firebaseUid: uid});
        if(!user){
            res.cookie("session", idToken, {
                httpOnly: true,
                secure: true,        
                sameSite: "none",    
                maxAge: 24 * 60 * 60 * 1000, 
            });

            return res.status(200).json({
                        message: "Sign Up First, Onboarding required",
                        role: role,
                        onboardingRequired: true
                    });
        }

        if(role !== user.role){
            return res.status(400).json({message: "Role Mismatched"});
            //redirect to home page
        }

        res.cookie("session", idToken, {
            httpOnly: true,
            secure: true,        
            sameSite: "none",    
            maxAge: 24 * 60 * 60 * 1000, 
        });

        return res.status(200).json({
            message: "Login successful",
            role: user.role,
            onboardingRequired: false
        });
    } catch (error) {
        console.log("error in login", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}

const signUpCandidate = async(req, res) => {
    try {
        const {uid, email} = req.user;
        const {fullName, linkedin, role} = req.body;
        console.log(req.body);
        if(!fullName || !linkedin || !role){
            return res.status(400).json({message: "profile missing"});
        }

        if (!req.file) {
            return res.status(400).json({ message: "Resume is required" });
        }
        
        const filePath = `resumes/${uid}/resume-${Date.now()}.pdf`;
        const file = bucket.file(filePath);

        await file.save(req.file.buffer, {
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        const [resumeUrl] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2030",
        });

        let user = await User.create({
            firebaseUid: uid,
            email,
            role: role,
            profile: {
                name: fullName,
                resumeUrl,
                linkedinUrl: linkedin,
            }
        });

        let resume = await Resume.create({
            userId: user._id,
            firebaseUid: uid,
            url: resumeUrl,
            storagePath: filePath,
        });

        triggerAIprocessing({
            resume_id: resume._id.toString(),
            resume_url: resume.url,
            firebase_uid: uid
        });
        
        return res.status(200).json({
            message: "Sign Up successfull",
            role: user.role
        });

    } catch (error) {
        console.log("Error in sign up", error);
        return res.status(400).json({message: "Error in signUp"});
    }
}

const signUpRecruiter = async (req, res) => {
    try {
        const {uid, email} = req.user;
        const {fullName, companyName, department, position, role} = req.body;
        console.log(req.body);
        if(!fullName || !companyName || !department || !position || !role){
            return res.status(400).json({message: "profile missing"});
        }

        let user = await User.create({
            firebaseUid: uid,
            email,
            role: role,
            profile: {
                name: fullName,
                company: companyName,
                position: position,
                department: department
            }
        });

        return res.status(200).json({
            message: "Sign Up successfull",
            role: user.role
        });

    } catch (error) {
        console.log("Error in sign up", error);
        return res.status(400).json({message: "Error in signUp"});
    }

}
const refreshSession = async (req, res) => {
    try {
        const { idToken } = req.user;

        res.cookie("session", idToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        const user = await User.findOne({ firebaseUid: req.user.uid });

        return res.status(200).json({
            message: "Session refreshed",
            role: user?.role || null,
            onboardingRequired: !user,
        });
    } catch (error) {
        console.log("Error refreshing session", error);
        return res.status(401).json({ message: "Invalid session" });
    }
};

const logout = async (req, res) => {
    res.clearCookie("session", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return res.status(200).json({message: "logOut successfull"});
}

export {login, signUpCandidate, logout, signUpRecruiter, refreshSession};
