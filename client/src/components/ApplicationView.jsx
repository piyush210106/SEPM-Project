import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import {useScheduleInterviewMutation, useGetApplicationsQuery} from "../store/RecruiterApi.js";
import { 
  FiUser, FiBriefcase, FiDownload, FiCheckCircle, FiXCircle, 
  FiCpu, FiLinkedin, FiMail, FiMapPin, FiChevronLeft, 
  FiStar, FiTrendingUp, FiMessageCircle, FiZap, FiCalendar, FiClock, FiSend 
} from 'react-icons/fi';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';

const ApplicationView = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {data} = useGetApplicationsQuery();
  const [schedule, {isLoading}] = useScheduleInterviewMutation();

  const application = data?.filteredApplications?.find((j) => j._id.toString() === id);
  const profile = application?.candidateId;
  const aiScore = application?.aiScore;
  const hasAiScore = aiScore?.score != null;
  const job = application?.jobId;

  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleData, setScheduleData] = useState({ date: '', time: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!data || isLoading) return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center py-20 px-6">
       <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-4 space-y-8">
               <div className="h-64 w-full bg-zinc-900 animate-pulse rounded-[2.5rem]" />
               <div className="h-48 w-full bg-zinc-900 animate-pulse rounded-[2.5rem]" />
           </div>
           <div className="lg:col-span-8 space-y-8">
               <div className="h-48 w-full bg-zinc-900 animate-pulse rounded-[2.5rem]" />
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="h-64 w-full bg-zinc-900 animate-pulse rounded-[2.5rem]" />
                  <div className="h-64 w-full bg-zinc-900 animate-pulse rounded-[2.5rem]" />
               </div>
           </div>
       </div>
    </div>
  );

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const localDateTime = new Date(`${scheduleData.date}T${scheduleData.time}`);
      await schedule({
        applicationId: application._id,
        data: {
          ...scheduleData,
          dateTime: localDateTime.toISOString()
        }
      }).unwrap();
      toast.success(`Interview scheduled for ${scheduleData.date} at ${scheduleData.time}`);
      navigate("/recruiter/interviews");
    } catch (error) {
      toast.error(error.data?.message || "Failed to schedule interview.");
    }
    setIsSubmitting(false);
  };


  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-150 h-150 bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-purple-900/10 blur-[100px] rounded-full" />
      </div>

      {/* Navigation Header (Jakob's Law) */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink to={"/recruiter/applications"} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group font-bold uppercase text-xs tracking-widest">
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Applicants
          </NavLink>
          
          <div className="flex gap-4">
            {!isScheduling ? (
              <>
                <button className="px-6 py-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-purple-500/50 transition-all text-xs font-bold uppercase tracking-widest">Reject</button>
                <button 
                  onClick={() => setIsScheduling(true)}
                  className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20 transition-all text-xs font-bold uppercase tracking-widest"
                >
                  Schedule Interview
                </button>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 bg-zinc-900 p-1.5 rounded-2xl border border-purple-500/30 shadow-2xl"
              >
                <div className="flex items-center gap-2 px-3">
                  <FiCalendar className="text-purple-500" />
                  <input 
                    type="date" 
                    required
                    className="bg-transparent text-lg font-bold outline-none border-none text-zinc-300 focus:text-white"
                    onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-2 px-3 border-l border-white/10">
                  <FiClock className="text-purple-500" />
                  <input 
                    type="time" 
                    required
                    className="bg-transparent text-xl font-bold outline-none border-none text-purple-300 focus:text-white"
                    onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                  />
                </div>
                <button 
                  onClick={handleScheduleSubmit}
                  disabled={isSubmitting || !scheduleData.date || !scheduleData.time}
                  className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Confirm"} <FiSend />
                </button>
                <button 
                  onClick={() => setIsScheduling(false)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <FiXCircle />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Candidate & Job Profile */}
          <div className="lg:col-span-4 space-y-8">
            <motion.section {...fadeInUp} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-10"><FiUser size={80}/></div>
              <div className="w-20 h-20 bg-purple-600 rounded-3xl mb-6 flex items-center justify-center text-3xl font-black shadow-2xl">
                {profile?.profile?.name?.charAt(0)}
              </div>
              <h1 className="text-3xl font-black mb-1">{profile?.profile?.name}</h1>
              <p className="text-purple-400 font-bold text-sm mb-6">Unknown Experience</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                  <FiMail className="text-purple-500" /> {profile?.email}
                </div>
                <a href={`https://${profile.profile.linkedinUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 text-sm">
                  <FiLinkedin className="text-purple-500" /> {profile?.profile?.linkedinUrl}
                </a>
              </div>

              <a 
                href={profile?.profile?.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-2xl text-sm font-bold transition-all border border-white/5 group"
              >
                <FiDownload className="group-hover:translate-y-0.5 transition-transform" /> Download Resume PDF
              </a>
            </motion.section>

            <motion.section {...fadeInUp} transition={{delay: 0.1}} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600 mb-6">Application For</h3>
              <div className="p-4 bg-black rounded-2xl border border-white/5">
                <h4 className="font-bold text-lg mb-1">{job?.title}</h4>
                <p className="text-zinc-500 text-xs font-medium mb-3">{job.department}</p>
                <span className="text-[10px] bg-zinc-900 px-2 py-1 rounded text-zinc-400 font-bold uppercase tracking-widest">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.section>
          </div>

          {/* RIGHT: AI ANALYSIS */}
          <div className="lg:col-span-8 space-y-8">

            {hasAiScore ? (
              <>
                {/* AI Score Header */}
                <motion.section {...fadeInUp} className="bg-zinc-950 border border-purple-500/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-purple-600/10 to-transparent pointer-events-none" />

                   <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                     <div className="flex items-center gap-8">
                        <div className="relative">
                           <svg className="w-32 h-32 transform -rotate-90">
                              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-900" />
                              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
                                strokeDasharray={364.4}
                                strokeDashoffset={364.4 - (364.4 * (aiScore.score || 0)) / 100}
                                className="text-purple-500 transition-all duration-1000" />
                           </svg>
                           <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-3xl font-black">{aiScore.score}%</span>
                              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Neural Score</span>
                           </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <FiCpu className="text-purple-500 animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-widest text-purple-400">Analysis Complete</span>
                          </div>
                          <h2 className="text-4xl font-black uppercase tracking-tighter italic">
                            {aiScore.overallFit || "Pending"} Fit
                          </h2>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        {[1,2,3,4,5].map(i => {
                          const starCount = aiScore.overallFit === "Excellent" ? 5 : aiScore.overallFit === "Good" ? 4 : aiScore.overallFit === "Fair" ? 3 : 2;
                          return <FiStar key={i} className={i <= starCount ? "text-purple-500 fill-purple-500" : "text-zinc-800"} />;
                        })}
                     </div>
                   </div>
                </motion.section>

                {/* Detailed AI Insight */}
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.section {...fadeInUp} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                     <div>
                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">
                          <FiTrendingUp className="text-purple-500" /> Analysis
                        </h3>
                        <p className="text-zinc-300 leading-relaxed text-sm italic">"{aiScore.analysis || "No analysis available yet."}"</p>
                     </div>
                     <div className="h-px bg-white/5" />
                     {/* <div>
                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">
                          <FiZap className="text-purple-500" /> Recommendation
                        </h3>
                        <p className="text-zinc-300 text-sm leading-relaxed">{aiScore.recommendations || "No recommendation available yet."}</p>
                     </div> */}
                  </motion.section>

                  <motion.section {...fadeInUp} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8">
                     <div className="mb-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-green-500 mb-4 flex items-center gap-2">
                          <FiCheckCircle /> Matched Competencies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {aiScore.matchedSkills?.length > 0 ? aiScore.matchedSkills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold rounded-lg uppercase">
                              {skill}
                            </span>
                          )) : <span className="text-zinc-600 text-sm">No matched skills data yet</span>}
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                          <FiXCircle /> Skills Gaps
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {aiScore.missingSkills?.length > 0 ? aiScore.missingSkills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold rounded-lg uppercase">
                              {skill}
                            </span>
                          )) : <span className="text-zinc-600 text-sm">No skills gap data yet</span>}
                        </div>
                     </div>
                  </motion.section>
                </div>
              </>
            ) : (
              /* AI Pending State */
              <motion.section {...fadeInUp} className="bg-zinc-950 border border-purple-500/20 rounded-[2.5rem] p-12 relative overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center">
                    <FiCpu className="text-purple-500 animate-pulse" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black mb-2">AI Analysis In Progress</h2>
                    <p className="text-zinc-500 text-sm max-w-md">
                      Our neural engine is processing this candidate's resume against the job requirements. Results will appear here automatically.
                    </p>
                  </div>
                  <div className="flex gap-3 mt-2">
                    {[1,2,3].map(i => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* Quick Action Dock */}
            <motion.div 
              {...fadeInUp}
              className="p-4 bg-zinc-900/50 border border-white/5 rounded-3xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4 px-4">
                 <FiMessageCircle className="text-purple-500" />
                 <span className="text-sm text-zinc-400 font-medium">Add internal note for the hiring team...</span>
              </div>
              <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold transition-all">Save Note</button>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationView;