import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { 
  FiUser, 
  FiBriefcase, 
  FiLayers, 
  FiArrowRight, 
  FiArrowLeft,
  FiCheck, 
  FiZap,
  FiShield,
  FiLoader
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const SignUpRec = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    department: '',
    position: '',
    role: "recruiter"
  });

  const steps = [
    { id: 1, title: 'Personal', icon: <FiUser /> },
    { id: 2, title: 'Company', icon: <FiBriefcase /> },
    { id: 3, title: 'Role', icon: <FiLayers /> },
    { id: 4, title: 'Position', icon: <FiLayers /> },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signUpRecruiter`,
        formData,
        {
          withCredentials: true
        }
      )
      setIsSubmitting(false);
      toast.success("Dashboard initialized! Welcome aboard.");
      navigate("/recruiter/addjob");
    } catch (error) {
      console.log("Error in submitting form", error);
      setIsSubmitting(false);
      toast.error(error.response?.data?.message || "Sign up failed. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Radial Glow (Aesthetic Usability) */}
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-purple-900/10 blur-[120px] rounded-full" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 flex items-center gap-2"
      >
        <FiZap className="text-purple-500 text-3xl" />
        <span className="text-2xl font-black tracking-tighter uppercase">InterVue <span className="text-purple-500">Recruiter</span></span>
      </motion.div>

      <div className="w-full max-w-lg">
        {/* Progress Stepper (Goal-Gradient Effect) */}
        <div className="flex justify-between mb-12 relative px-4">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-zinc-800 -z-10" />
          <div 
            className="absolute top-5 left-0 h-0.5 bg-purple-500 transition-all duration-500 -z-10" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step >= s.id ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-black border-zinc-800 text-zinc-600'
              }`}>
                {step > s.id ? <FiCheck strokeWidth={3} /> : s.icon}
              </div>
              <span className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${step >= s.id ? 'text-purple-400' : 'text-zinc-600'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-zinc-950/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {step === 1 && (
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome, Partner.</h2>
                  <p className="text-zinc-500 mb-8">Let's start with your professional identity.</p>
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-zinc-500 uppercase ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 outline-none focus:border-purple-500 transition-all"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold mb-2">The Mission.</h2>
                  <p className="text-zinc-500 mb-8">Which organization are we empowering today?</p>
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-zinc-500 uppercase ml-1">Company Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Cyberdyne Systems"
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 outline-none focus:border-purple-500 transition-all"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Territory.</h2>
                  <p className="text-zinc-500 mb-8">Help us tailor your dashboard to your team.</p>
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-zinc-500 uppercase ml-1">Department</label>
                    <select 
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    >
                      <option value="" disabled>Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Product & Design</option>
                      <option value="HR">Talent Acquisition</option>
                      <option value="Sales">Sales & Ops</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Territory.</h2>
                  <p className="text-zinc-500 mb-8">Help us tailor your dashboard to your team.</p>
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-zinc-500 uppercase ml-1">Position</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Senior Analyst"
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 outline-none focus:border-purple-500 transition-all"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Controls (Fitts's Law) */}
          <div className="mt-12 flex flex-col gap-4">
            <button 
              onClick={handleNext}
              disabled={isSubmitting || (step === 1 && !formData.fullName) || (step === 2 && !formData.companyName) || (step === 3 && !formData.department)}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-30 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(168,85,247,0.2)] active:scale-95"
            >
              {isSubmitting ? <FiLoader className="animate-spin" /> : step === 4 ? "Initialize Dashboard" : "Next Phase"}
              {!isSubmitting && <FiArrowRight />}
            </button>
            
            {step > 1 && !isSubmitting && (
              <button 
                onClick={() => setStep(step - 1)}
                className="flex items-center justify-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold"
              >
                <FiArrowLeft size={14} /> Back
              </button>
            )}
          </div>
        </div>

        {/* Trust Footer (Law of Similarity) */}
        <div className="mt-8 flex items-center justify-center gap-6 text-zinc-600">
           <div className="flex items-center gap-2"><FiShield className="text-purple-900" /> <span className="text-[10px] uppercase font-bold tracking-widest">GDPR Ready</span></div>
           <div className="w-1 h-1 bg-zinc-800 rounded-full" />
           <div className="flex items-center gap-2"><FiZap className="text-purple-900" /> <span className="text-[10px] uppercase font-bold tracking-widest">AI Verified</span></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpRec;