import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { 
  FiUser, 
  FiFileText, 
  FiLinkedin, 
  FiArrowRight, 
  FiCheck, 
  FiUploadCloud, 
  FiZap,
  FiLoader
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const SignUpCan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    resume: null,
    linkedin: '',
    role: "candidate"
  });

  const totalSteps = 3;

  // Progressive Disclosure Logic (Miller's Law)
  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/signUpCandidate`,
            formData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              }
            }
          )
          console.log(formData);
          console.log(response.data);
          setLoading(false);
          toast.success("Profile created successfully!");
          navigate("/candidate/injobs");
    } catch (error) {
          console.log("Error in submitting form", error);
          setLoading(false);
          toast.error(error.response?.data?.message || "Sign up failed. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, resume: file });
  };

  // Animation Variants
  const slideIn = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-purple-500/30 py-16">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      {/* Brand Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10 flex items-center gap-3"
      >
        <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          <FiZap size={24} className="text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter">Inter<span className="text-purple-500">Vue</span></h1>
      </motion.div>

      <div className="w-full max-w-md">
        {/* Goal-Gradient Progress Bar (Zeigarnik Effect) */}
        <div className="mb-8 flex justify-between items-center px-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                step >= s ? 'border-purple-500 bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'border-zinc-800 text-zinc-600'
              }`}>
                {step > s ? <FiCheck strokeWidth={3} /> : s}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-purple-400' : 'text-zinc-600'}`}>
                {s === 1 ? 'Bio' : s === 2 ? 'Resume' : 'Social'}
              </span>
            </div>
          ))}
          <div className="absolute w-full max-w-md h-0.5 bg-zinc-900 -z-10 left-0 right-0 mx-auto" style={{top: '188px'}} />
        </div>

        {/* Signup Card (Aesthetic-Usability Effect) */}
        <div className="bg-zinc-950 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Name */}
            {step === 1 && (
              <motion.div key="step1" {...slideIn}>
                <h2 className="text-2xl font-bold mb-2">Identify yourself.</h2>
                <p className="text-zinc-500 text-sm mb-8">Let's start with how recruiters should address you.</p>
                
                <div className="relative group">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    autoFocus
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-black border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white font-medium"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Resume (Law of Proximity - grouping upload box) */}
            {step === 2 && (
              <motion.div key="step2" {...slideIn}>
                <h2 className="text-2xl font-bold mb-2">Upload Resume.</h2>
                <p className="text-zinc-500 text-sm mb-8">Our AI will parse your skills in seconds.</p>
                
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-zinc-800 rounded-3xl cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUploadCloud size={40} className="text-zinc-500 group-hover:text-purple-500 mb-4 transition-transform group-hover:-translate-y-1" />
                    <p className="text-sm text-zinc-400 font-medium">
                      {formData.resume ? formData.resume.name : "Click to upload PDF"}
                    </p>
                  </div>
                  <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                </label>
              </motion.div>
            )}

            {/* STEP 3: LinkedIn */}
            {step === 3 && (
              <motion.div key="step3" {...slideIn}>
                <h2 className="text-2xl font-bold mb-2">Digital Footprint.</h2>
                <p className="text-zinc-500 text-sm mb-8">Link your professional profile to finish.</p>
                
                <div className="relative group">
                  <FiLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    autoFocus
                    type="url"
                    placeholder="linkedin.com/in/username"
                    className="w-full bg-black border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white font-medium"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Buttons (Fitts's Law: Large, easy targets) */}
          <div className="mt-10 flex flex-col gap-4">
            <button 
              onClick={nextStep}
              disabled={loading || (step === 1 && !formData.fullName) || (step === 2 && !formData.resume) || (step === 3 && !formData.linkedin)}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-purple-900/20 active:scale-[0.98] transition-all overflow-hidden"
            >
              {loading ? (
                <FiLoader className="animate-spin" />
              ) : (
                <>
                  {step === totalSteps ? 'Complete Profile' : 'Continue'}
                  <FiArrowRight />
                </>
              )}
            </button>

            {step > 1 && !loading && (
              <button 
                onClick={() => setStep(step - 1)}
                className="w-full py-2 text-zinc-500 hover:text-white text-sm font-semibold transition-colors"
              >
                Go Back
              </button>
            )}
          </div>
        </div>

        {/* Footer info (Law of Similarity) */}
        <p className="mt-8 text-center text-zinc-600 text-xs">
          By continuing, you agree to InterVue's <span className="text-zinc-400 underline">Terms of Neural Service</span> and <span className="text-zinc-400 underline">Privacy Protocol</span>.
        </p>
      </div>
    </div>
  );
};

export default SignUpCan;