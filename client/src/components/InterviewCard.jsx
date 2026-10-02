import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  FiVideo, 
  FiClock, 
  FiCalendar, 
  FiArrowRight, 
  FiZap,
  FiUser,
  FiActivity
} from 'react-icons/fi';


const InterviewCard = (interview) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isLive, setIsLive] = useState(false);
  interview = interview.interview;
  const job = interview?.JobId;
  const candidate = interview?.candidateId;
  const recruiter = interview?.recruiterId;

  const date = new Date(interview?.scheduledAt);
  const formattedDate = date.toLocaleDateString("en-IN");
  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const scheduled = new Date(date);
      const diff = scheduled - now;

      if (diff <= 0) {
        setIsLive(true);
        setTimeLeft("SESSION ACTIVE");
        clearInterval(timer);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [interview?.scheduledAt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005, borderColor: isLive ? '#a855f7' : '#27272a' }}
      className="max-w-screen bg-zinc-950 border border-white/5 rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300"
    >
      <div className="flex flex-col lg:flex-row items-stretch min-h-30">
        
        {/* STATUS INDICATOR (Law of Similarity) */}
        <div className={`w-full lg:w-2 flex items-center justify-center ${isLive ? 'bg-purple-600 animate-pulse' : 'bg-zinc-800'}`} />

        <div className="flex-1 flex flex-col md:flex-row items-center p-6 lg:px-10 gap-8">
          
          {/* ICON & TITLE (Law of Proximity) */}
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className={`hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center border transition-all duration-500 ${
              isLive ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-zinc-900 border-white/5 text-zinc-600'
            }`}>
              {isLive ? <FiActivity size={24} className="animate-bounce" /> : <FiVideo size={24} />}
            </div>
            
            <div className="truncate">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight truncate leading-tight">
                {job?.title}
              </h3>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-purple-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1">
                   {candidate.profile.name}
                </span>
                <span className="text-zinc-600 hidden sm:inline">|</span>
                <span className="text-zinc-400 text-sm font-medium flex items-center gap-2">
                  <FiUser className="text-zinc-600" /> {recruiter.profile.name}
                </span>
              </div>
            </div>
          </div>

          {/* CHUNKED INFO (Miller's Law) */}
          <div className="flex items-center gap-8 lg:gap-12 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-10">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Date</span>
              <span className="text-white font-bold flex items-center gap-2">
                <FiClock size={14} className="text-purple-500" /> {formattedDate}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Time</span>
              <span className="text-white font-bold flex items-center gap-2">
                <FiClock size={14} className="text-purple-500" /> {formattedTime}
              </span>
            </div>

            <div className="flex flex-col min-w-30">
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Countdown</span>
              <span className={`font-mono text-lg font-black tracking-tighter ${isLive ? 'text-purple-400' : 'text-zinc-300'}`}>
                {timeLeft}
              </span>
            </div>
          </div>

          {/* ACTION BUTTON (Fitts's Law) */}
          <div className="w-full md:w-auto md:ml-4">
            <NavLink
              to={`/callview/${interview._id}`}
              disabled={!isLive}
              className={`w-full md:w-auto px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative group/btn ${
                isLive 
                ? 'bg-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-purple-500 active:scale-95' 
                : 'bg-zinc-900 text-zinc-700 border border-white/5 cursor-not-allowed'
              }`}
            >
              {isLive ? (
                <>
                  Enter Interview <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </>
              ) : (
                'Room Locked'
              )}
              
              {/* Animated hover gloss (Aesthetic-Usability) */}
              {isLive && (
                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default InterviewCard;