import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  FiUser,
  FiBriefcase,
  FiFileText,
  FiArrowRight,
  FiCpu,
  FiLinkedin,
  FiExternalLink,
  FiStar
} from 'react-icons/fi';


const ApplicationCard = (applicant) => {
  const application = applicant?.applicant;
  const candidate = application?.candidateId;
  const job = application?.jobId;
  const aiScore = application?.aiScore;
  const hasAiScore = aiScore?.score != null;

  const matchedSkills = aiScore?.matchedSkills?.slice(0, 4) || [];
  const fitLabel = aiScore?.overallFit || "Pending";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.005, borderColor: '#a855f7' }}
      className="max-w-6xl mx-auto bg-zinc-950 border border-white/5 rounded-3xl p-5 md:p-6 cursor-pointer transition-all duration-300 shadow-xl group relative overflow-hidden mb-4"
    >
      {/* Aesthetic Usability: Ambient Score Glow */}
      <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-purple-600/5 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">

        {/* SECTION 1: CANDIDATE IDENTITY (Law of Proximity) */}
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-purple-400 transition-colors shadow-inner overflow-hidden">
            <span className="text-xl font-black">{candidate?.profile?.name?.charAt(0)}</span>
          </div>

          <div className="truncate">
            <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight truncate">
              {candidate?.profile?.name}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-zinc-500 text-sm font-medium">
              <a href={`https://${candidate?.profile?.linkedinUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5"><FiLinkedin size={14}/> Profile</a>
              <span className="text-zinc-800">|</span>
              <span className="truncate">{candidate?.email}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: JOB CONTEXT (Miller's Law - Chunking) */}
        <div className="flex items-center gap-8 lg:gap-12 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-10">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Target Role</span>
            <span className="text-zinc-300 font-bold flex items-center gap-2 text-sm">
              <FiBriefcase className="text-purple-500" size={14} /> {job?.title}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Experience</span>
            <span className="text-zinc-300 font-bold text-sm">{job?.qualifications?.experienceYears} yrs</span>
          </div>
        </div>

        {/* SECTION 3: AI SCORING (Doherty Threshold - Instant Visual Cue) */}
        <div className="flex items-center gap-6 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-10">
          <div className="flex flex-col items-center">
             <div className="flex items-center gap-2 mb-1">
                <FiCpu className={`text-purple-500 ${hasAiScore ? '' : 'animate-pulse'}`} size={14} />
                <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Match Score</span>
             </div>
             <div className="relative flex items-center justify-center">
                <span className="text-2xl font-black text-white">
                  {hasAiScore ? `${aiScore.score}%` : '--'}
                </span>
             </div>
          </div>

          <div className="hidden sm:flex flex-col gap-1.5">
             {hasAiScore ? (
               <>
                 <div className="flex gap-1">
                    {[1,2,3].map(i => {
                      const starCount = aiScore.overallFit === "Excellent" ? 3 : aiScore.overallFit === "Good" ? 2 : 1;
                      return <FiStar key={i} size={10} className={i <= starCount ? "fill-purple-500 text-purple-500" : "text-zinc-800"} />;
                    })}
                 </div>
                 <span className="px-3 py-1 bg-purple-600/10 text-purple-400 text-[10px] font-black uppercase rounded-lg border border-purple-500/20">
                    {fitLabel}
                 </span>
               </>
             ) : (
               <span className="px-3 py-1 bg-zinc-900 text-zinc-500 text-[10px] font-black uppercase rounded-lg border border-white/5">
                  Processing
               </span>
             )}
          </div>
        </div>

        {/* SECTION 4: ACTION (Fitts's Law - Large Target) */}
        <div className="lg:ml-4 flex items-center">
          <NavLink to={`/application/${application._id}`} className="w-12 h-12 rounded-2xl bg-zinc-900 group-hover:bg-purple-600 flex items-center justify-center text-zinc-600 group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-purple-500/40">
            <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

      </div>

      {/* FOOTER: Skills Preview (Law of Similarity) */}
      {matchedSkills.length > 0 && (
        <div className="hidden md:flex flex-wrap gap-2 mt-4 ml-19">
          {matchedSkills.map((skill, i) => (
            <span key={i} className="text-[10px] font-bold text-zinc-500 border border-zinc-900 px-2 py-0.5 rounded uppercase hover:border-purple-500/30 transition-colors">
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};


export default ApplicationCard;
