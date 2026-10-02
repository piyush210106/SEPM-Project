import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppliedJobCard from '../../components/AppliedJobCard.jsx';
import {useGetAppliedJobsQuery} from "../../store/CandidateApi.js";
import { 
  FiUser, FiBriefcase, FiCpu, FiArrowRight, 
  FiSearch, FiFilter, FiMoreHorizontal, FiCheckCircle,
  FiXCircle, FiClock, FiStar, FiDownload
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const AppliedJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {data, isLoading, isError} = useGetAppliedJobsQuery();

  useEffect(() => {
    if (isError) toast.error("Failed to load applications. Please refresh.");
  }, [isError]);

  const applications = data?.applications || [];
  const filteredApps = applications.filter((app) =>
    app.jobId.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 md:p-12 py-16">
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-125 h-125 bg-purple-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION (Aesthetic-Usability) */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black tracking-tighter mb-2">Manage <span className="text-purple-500">Applications</span></h1>
            <p className="text-zinc-500 text-sm font-medium">Review AI-review and status for your active job postings.</p>
          </motion.div>

          {/* SEARCH & FILTERS (Hick's Law - Grouped controls) */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search candidates..."
                className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-purple-500 outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
               <div className="space-y-4">
                 {[1,2,3].map(i => <LoadingSkeleton key={i} />)}
               </div>
            ) : (
              filteredApps.map((app) => (
                <AppliedJobCard
                  key = {app._id}
                  application = {app}  
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


// Loading Shimmer (Doherty Threshold)
const LoadingSkeleton = () => (
  <div className="h-24 w-full bg-zinc-900/50 rounded-3xl animate-pulse border border-white/5" />
);

export default AppliedJobs;