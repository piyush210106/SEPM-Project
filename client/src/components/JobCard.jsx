import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  FiMapPin, 
  FiDollarSign, 
  FiArrowRight, 
  FiZap, 
  FiCpu,
  FiClock,
  FiExternalLink
} from 'react-icons/fi';


const JobCard = ({ job }) => {


  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      className="group relative w-full bg-zinc-950 border border-white/5 hover:border-purple-500/40 rounded-3xl p-5 md:p-6 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden mb-4"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-purple-600/5 to-transparent pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        
        {/* LEFT SECTION: Brand & Main Title */}
        <div className="flex items-center gap-5 flex-1">
          <div className="hidden sm:flex w-14 h-14 bg-zinc-900 border border-white/10 rounded-2xl items-center justify-center text-purple-500 shadow-inner group-hover:shadow-purple-500/20 group-hover:border-purple-500/30 transition-all">
            <FiZap size={28} fill="currentColor" className="opacity-80" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight">
                {job.title}
              </h3>
              {job.externalLink && <FiExternalLink className="text-zinc-600 text-xs" />}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-zinc-500 text-sm font-medium">
              <span className="text-purple-400 font-bold tracking-tighter uppercase text-xs">
                {job.company}
              </span>
              <span className="flex items-center gap-1.5"><FiMapPin className="text-purple-500" /> {job.location.city}</span>
              <span className="flex items-center gap-1.5"><FiClock /> 2h ago</span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Key Stats (Chunking data) */}
        <div className="flex flex-wrap items-center gap-3 md:gap-8 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Salary Range</span>
            <span className="text-white font-bold flex items-center gap-1">
              <FiDollarSign className="text-green-500" size={14} />
              {(job.salary.min / 1000)}k - {(job.salary.max / 1000)}k
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Type</span>
            <span className="text-zinc-300 font-bold text-sm capitalize">{job.employmentType}</span>
          </div>

          {/* AI Match Chip (Aesthetic Usability) */}
          <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center gap-2">
            <FiCpu className="text-purple-500 text-xs animate-pulse" />
            <span className="text-xs font-bold text-purple-400 uppercase tracking-tighter">92% Match</span>
          </div>
        </div>

        {/* RIGHT SECTION: CTA (Fitts's Law) */}
        <div className="md:ml-4 flex items-center">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 group-hover:bg-purple-600 flex items-center justify-center text-zinc-600 group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-purple-500/40">
            <NavLink to={`/candidate/jobview/${job._id}`}>            
              <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>
        </div>

      </div>

      {/* BOTTOM: Skill Badges (Hidden on tiny screens to reduce clutter/Hick's Law) */}
      {/* <div className="hidden sm:flex flex-wrap gap-2 mt-4 ml-19">
        {data.qualifications.skills.slice(0, 4).map((skill, i) => (
          <span key={i} className="text-[10px] font-bold text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded uppercase">
            {skill}
          </span>
        ))}
      </div> */}
    </motion.div>
  );
};

export default JobCard;