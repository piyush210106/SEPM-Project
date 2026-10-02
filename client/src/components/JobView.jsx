import React, { useState } from 'react';
import {useGetInternalJobsQuery, useApplyJobMutation} from "../store/CandidateApi.js";
import { motion } from 'framer-motion';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { 
  FiBriefcase, FiMapPin, FiDollarSign, FiCalendar, FiUsers, 
  FiChevronLeft, FiSend, FiBookmark, FiGlobe, FiCpu,
  FiAward, FiLayers, FiCheckCircle, FiZap
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const JobView = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applyJob] = useApplyJobMutation();

  const {id} = useParams();
  const {data, isLoading} = useGetInternalJobsQuery();
  const job = data?.jobs?.find((j) => j._id?.toString() === id);
  if (!data || isLoading) return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center py-20 px-6">
       <div className="w-full max-w-6xl space-y-8">
           <div className="h-16 w-3/4 bg-zinc-900 animate-pulse rounded-2xl" />
           <div className="flex gap-4">
              <div className="h-8 w-24 bg-zinc-900 animate-pulse rounded-full" />
              <div className="h-8 w-32 bg-zinc-900 animate-pulse rounded-full" />
           </div>
           <div className="h-64 w-full bg-zinc-900 animate-pulse rounded-3xl" />
           <div className="h-32 w-full bg-zinc-900 animate-pulse rounded-3xl" />
       </div>
    </div>
  );

  const handleApply = async(e) => {
    try {
        const res = await applyJob(id).unwrap();
        toast.success("Application submitted successfully!");
        navigate("/candidate/injobs");
    } catch (err) {
        console.error(err);
        toast.error(err.data?.message || "Failed to apply. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans pb-20">
      
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-150 h-150 bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-purple-900/5 blur-[100px] rounded-full" />
      </div>

      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5 py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <NavLink to={"/candidate/injobs"} className="flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors group">
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="font-medium">Back to Jobs</span>
          </NavLink >
          <div className="flex gap-3">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`p-3 rounded-xl border transition-all ${isSaved ? 'bg-purple-600 border-purple-500 text-white' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
            >
              <FiBookmark fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button className="p-3 rounded-xl border border-zinc-800 text-zinc-400 hover:border-zinc-600 transition-all">
              <FiSend />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{job.title}</h1>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full border border-white/5">
                  <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center text-[10px]">IV</div>
                  <span className="font-bold text-sm">{job.company}</span>
                </div>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400 font-medium flex items-center gap-2">
                  <FiMapPin className="text-purple-500" /> {job.location.city}, {job.location.state}
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-bold uppercase tracking-widest">
                  {job.employmentType}
                </span>
              </div>
            </motion.div>

            {/* AI Summary Highlight (Aesthetic-Usability) */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="p-6 rounded-3xl bg-linear-to-r from-purple-900/20 to-transparent border border-purple-500/20 flex items-start gap-4"
            >
              <FiZap className="text-purple-500 mt-1 shrink-0 animate-pulse" />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-1">AI Match Insight</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">Based on your profile, you have a 85% skill match for this role. Your experience with WebRTC is a key highlight for this department.</p>
              </div>
            </motion.div>

            {/* Job Content Sections (Miller's Law - Chunking) */}
            <section className="space-y-8 text-zinc-300">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">About the Role</h3>
                <p className="leading-relaxed text-lg text-zinc-400">{job.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FiCheckCircle className="text-purple-500" /> Requirements
                  </h3>
                  <ul className="space-y-3">
                    {job.requirements.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed border-l border-zinc-800 pl-4">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FiLayers className="text-purple-500" /> Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed border-l border-zinc-800 pl-4">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR: Action & Stats (Fitts's Law & Hick's Law) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Application Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-950 border border-white/5 rounded-4xl p-8 top-28"
            >
              <div className="mb-8">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Salary Range</p>
                <h2 className="text-3xl font-black">
                  {job.salary.currency} {(job.salary.min/1000).toFixed(0)}k - {(job.salary.max/1000).toFixed(0)}k
                  <span className="text-sm text-zinc-500 font-medium lowercase"> / year</span>
                </h2>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                  <span className="text-zinc-500 flex items-center gap-2"><FiUsers /> Openings</span>
                  <span className="font-bold">{job.openings} Seats</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                  <span className="text-zinc-500 flex items-center gap-2"><FiGlobe /> Remote</span>
                  <span className="font-bold text-green-500">{job.location.remote ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                  <span className="text-zinc-500 flex items-center gap-2"><FiGlobe /> Hybrid</span>
                  <span className="font-bold text-green-500">{job.location.hybrid ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                  <span className="text-zinc-500 flex items-center gap-2"><FiCalendar /> Posted</span>
                  <span className="font-bold">{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <button 
                onClick={handleApply}
                disabled={isApplying}
                className="w-full py-5 bg-purple-600 hover:bg-purple-500 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-purple-900/20 active:scale-95 flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50"
              >
                {isApplying ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <FiCpu />
                  </motion.div>
                ) : (
                  <>Apply with AI Profile <FiArrowRight /></>
                )}
              </button>
              
              <p className="text-[10px] text-center text-zinc-600 mt-4 uppercase font-bold tracking-tighter">
                Our AI will auto-submit your InterVue resume
              </p>
            </motion.div>

            {/* Required Qualifications (Law of Similarity) */}
            <div className="bg-zinc-950 border border-white/5 rounded-4xl p-8">
              <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Preferred Background</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <FiAward className="text-purple-500 shrink-0" size={20} />
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Education</p>
                    <p className="text-sm font-medium">{job.qualifications.education}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FiBriefcase className="text-purple-500 shrink-0" size={20} />
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Min. Experience</p>
                    <p className="text-sm font-medium">{job.qualifications.experienceYears} Years</p>
                  </div>
                </div>
              </div>

              {/* <div className="mt-8">
                <p className="text-xs text-zinc-500 font-bold uppercase mb-3">Key Skills</p>
                <div className="flex flex-wrap gap-2">
                  {job.qualifications.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-zinc-900 border border-white/5 text-zinc-300 text-[10px] font-bold rounded-lg uppercase">
                      {skill}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// Simple Arrow Right helper icon
const FiArrowRight = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="3" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

export default JobView;