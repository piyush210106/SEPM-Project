import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InterviewCard from "../../components/InterviewCard.jsx";
import {useGetInterviewsCanQuery} from "../../store/CandidateApi.js";
import toast from 'react-hot-toast';

const Waveform = () => (
  <div className="flex items-center gap-0.5 h-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        className="w-0.5 bg-purple-500"
        animate={{ height: [4, 12, 6, 14, 4] }}
        transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
      />
    ))}
  </div>
);

const IconWrapper = ({ children, className = "w-5 h-5" }) => (
  <motion.svg 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" className={className}
    initial="initial" animate="animate" whileHover="hover"
  >
    {children}
  </motion.svg>
);

const AnimatedVideoIcon = () => (
  <IconWrapper>
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </IconWrapper>
);


const InterviewsCan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {data, isLoading, isError} = useGetInterviewsCanQuery();

  useEffect(() => {
    if (isError) toast.error("Failed to load interviews. Please refresh.");
  }, [isError]);

  const interviews = data?.interviews || [];
  return (
    <div className="min-h-screen text-white font-sans selection:bg-purple-500/40 p-6 md:p-12 max-w-screen my-16">
      
      {/* HEADER: Focus on Upcoming Interviews (Fills Zeigarnik need) */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
            <span className="text-purple-500 text-[10px] font-black uppercase tracking-[0.3em]">Live Feed Active</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            UPCOMING<br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-800">
              SESSIONS
            </span>
          </h1>
          <p className="mt-4 text-gray-500 font-medium max-w-sm">
            You have <span className="text-white">{interviews.length || 0} potential oppurtunities</span> waiting in the queue for evaluation.
          </p>
        </motion.div>

        {/* Hick's Law - Simplified search */}
        <div className="flex items-center bg-[#111] border border-white/5 rounded-2xl px-4 py-2 focus-within:border-purple-500/50 transition-all">
          <IconWrapper className="w-4 h-4 text-gray-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></IconWrapper>
          <input 
            type="text" 
            placeholder="Search queue..."
            className="bg-transparent border-none focus:ring-0 text-sm font-bold p-2 w-48"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto">

        {/* The List */}
        <div className="space-y-4">
          <AnimatePresence>
            {isLoading ? (
              [1, 2, 3].map(i => <div key={i} className="h-24 w-full bg-[#111] animate-pulse rounded-2xl" />)
            ) : (
              interviews
                .filter(i => i.JobId.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((interview) => <InterviewCard key={interview._id} interview={interview} />)
            )}
          </AnimatePresence>
        </div>

      </main>

    </div>
  );
};

export default InterviewsCan;