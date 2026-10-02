import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAddJobMutation } from '../../store/RecruiterApi.js';
import { 
  FiBriefcase, FiMapPin, FiDollarSign, FiPlus, 
  FiTrash2, FiArrowRight, FiArrowLeft, FiCheck, 
  FiLayers, FiInfo, FiZap, FiCpu
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddJob = () => {
  const [addJob, {isLoading}] = useAddJobMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '', department: '', description: '',
    requirements: [''], responsibilities: [''],
    qualifications: { education: '', experienceYears: 0},
    location: { city: '', state: '', country: '', remote: false, hybrid: false },
    salary: { min: 0, max: 0, currency: 'USD' },
    employmentType: 'full-time', openings: 1
  });

  const totalSteps = 4;

  // Form Navigation Logic
  const handleNext = () => currentStep < totalSteps && setCurrentStep(prev => prev + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await addJob(formData).unwrap();
      toast.success("Job published successfully!");
      setFormData({
        title: '', department: '', description: '',
        requirements: [''], responsibilities: [''],
        qualifications: { education: '', experienceYears: 0},
        location: { city: '', state: '', country: '', remote: false, hybrid: false },
        salary: { min: 0, max: 0, currency: 'USD' },
        employmentType: 'full-time', openings: 1
      });
      setCurrentStep(1);
    } catch (error) {
      toast.error(error.data?.message || "Failed to publish job. Please try again.");
    }
  };

  const handleArrayUpdate = (field, index, value, nestedField = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (nestedField) {
        newData.qualifications[nestedField][index] = value;
      } else {
        newData[field][index] = value;
      }
      return newData;
    });
  };

  const addArrayItem = (field, nestedField = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (nestedField) newData.qualifications[nestedField].push('');
      else newData[field].push('');
      return newData;
    });
  };

  const removeArrayItem = (field, index, nestedField = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (nestedField) newData.qualifications[nestedField].splice(index, 1);
      else newData[field].splice(index, 1);
      return newData;
    });
  };

  const inputClass = "w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300";
  const labelClass = "block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 py-16 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-purple-600/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto">
        {/* Header (Jakob's Law) */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Create New <span className="text-purple-500">Job Opportunity</span></h1>
            <p className="text-zinc-500 font-medium italic">Powered by InterVue Neural Engine</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Step</p>
            <p className="text-3xl font-black text-purple-500">{currentStep} / {totalSteps}</p>
          </div>
        </div>

        {/* Goal-Gradient Progress Bar */}
        <div className="mb-12 h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
        >
          {/* STEP 1: Basic Info (Hick's Law: Focus on 3 choices) */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Job Title</label>
                  <input className={inputClass} placeholder="e.g. Senior Neural Architect" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Department</label>
                  <input className={inputClass} placeholder="e.g. Core Intelligence" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea className={`${inputClass} h-40 resize-none`} placeholder="Describe the mission..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>
          )}

          {/* STEP 2: Requirements & Responsibilities (Law of Proximity) */}
          {currentStep === 2 && (
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className={labelClass}>Requirements</label>
                {formData.requirements.map((req, i) => (
                  <div key={i} className="flex gap-2">
                    <input className={inputClass} value={req} onChange={(e) => handleArrayUpdate('requirements', i, e.target.value)} />
                    <button onClick={() => removeArrayItem('requirements', i)} className="p-2 text-zinc-600 hover:text-red-500"><FiTrash2 /></button>
                  </div>
                ))}
                <button onClick={() => addArrayItem('requirements')} className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest mt-2 hover:text-white transition-colors">
                  <FiPlus /> Add Requirement
                </button>
              </div>
              <div className="space-y-4">
                <label className={labelClass}>Responsibilities</label>
                {formData.responsibilities.map((res, i) => (
                  <div key={i} className="flex gap-2">
                    <input className={inputClass} value={res} onChange={(e) => handleArrayUpdate('responsibilities', i, e.target.value)} />
                    <button onClick={() => removeArrayItem('responsibilities', i)} className="p-2 text-zinc-600 hover:text-red-500"><FiTrash2 /></button>
                  </div>
                ))}
                <button onClick={() => addArrayItem('responsibilities')} className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest mt-2 hover:text-white transition-colors">
                  <FiPlus /> Add Responsibility
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Logistics (Hick's Law: Grouping Salary/Location) */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Employment Type</label>
                  <select className={inputClass} value={formData.employmentType} onChange={(e) => setFormData({...formData, employmentType: e.target.value})}>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Min Salary</label>
                  <input type="number" className={inputClass} value={formData.salary.min} onChange={(e) => setFormData({...formData, salary: {...formData.salary, min: e.target.value}})} />
                </div>
                <div>
                  <label className={labelClass}>Max Salary</label>
                  <input type="number" className={inputClass} value={formData.salary.max} onChange={(e) => setFormData({...formData, salary: {...formData.salary, max: e.target.value}})} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>City</label>
                  <input className={inputClass} value={formData.location.city} onChange={(e) => setFormData({...formData, location: {...formData.location, city: e.target.value}})} />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <input className={inputClass} value={formData.location.state} onChange={(e) => setFormData({...formData, location: {...formData.location, state: e.target.value}})} />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <input className={inputClass} value={formData.location.country} onChange={(e) => setFormData({...formData, location: {...formData.location, country: e.target.value}})} />
                </div>
                <div className="flex items-center gap-6 md:col-span-2 mt-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="hidden" checked={formData.location.remote} onChange={() => setFormData({...formData, location: {...formData.location, remote: !formData.location.remote}})} />
                    <div className={`w-6 h-6 rounded-md border border-white/20 flex items-center justify-center transition-all ${formData.location.remote ? 'bg-purple-600 border-purple-500' : 'bg-zinc-900'}`}>
                      {formData.location.remote && <FiCheck size={14} />}
                    </div>
                    <span className="text-sm font-bold text-zinc-400 group-hover:text-white">Remote</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="hidden" checked={formData.location.hybrid} onChange={() => setFormData({...formData, location: {...formData.location, hybrid: !formData.location.hybrid}})} />
                    <div className={`w-6 h-6 rounded-md border border-white/20 flex items-center justify-center transition-all ${formData.location.hybrid ? 'bg-purple-600 border-purple-500' : 'bg-zinc-900'}`}>
                      {formData.location.hybrid && <FiCheck size={14} />}
                    </div>
                    <span className="text-sm font-bold text-zinc-400 group-hover:text-white">Hybrid</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Skills & Qualifications (Final Check) */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Education Level</label>
                  <input className={inputClass} placeholder="e.g. Master's in CS" value={formData.qualifications.education} onChange={(e) => setFormData({...formData, qualifications: {...formData.qualifications, education: e.target.value}})} />
                </div>
                <div>
                  <label className={labelClass}>Experience (Years)</label>
                  <input type="number" className={inputClass} value={formData.qualifications.experienceYears} onChange={(e) => setFormData({...formData, qualifications: {...formData.qualifications, experienceYears: e.target.value}})} />
                </div>
                <div>
                  <label className={labelClass}>Opening</label>
                  <input type="number" className={inputClass} value={formData.openings} onChange={(e) => setFormData({...formData, openings: e.target.value})} />
                </div>
              </div>
              <div className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-2xl flex items-center gap-4">
                 <FiCpu className="text-purple-500 animate-pulse" size={24} />
                 <p className="text-xs text-purple-300 font-medium">InterVue AI will now analyze these parameters to shortlist top-tier candidates automatically.</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons (Fitts's Law) */}
          <div className="mt-12 flex justify-between items-center border-t border-white/5 pt-8">
            <button 
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 font-bold uppercase text-xs tracking-widest transition-all ${currentStep === 1 ? 'opacity-0' : 'text-zinc-500 hover:text-white'}`}
            >
              <FiArrowLeft /> Back
            </button>

            <button 
              onClick={currentStep === totalSteps ? handleSubmit : handleNext}
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-purple-900/20 active:scale-95 transition-all flex items-center gap-3"
            >
              {currentStep === totalSteps ? 'Finalize & Publish' : 'Continue Phase'}
              <FiArrowRight />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddJob;