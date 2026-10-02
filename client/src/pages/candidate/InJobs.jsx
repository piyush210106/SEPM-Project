import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from "../../components/JobCard.jsx";
import { useGetInternalJobsQuery } from '../../store/CandidateApi.js';
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiChevronRight,
  FiX,
  FiCheckCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function InJobs() {
  const [searchQuery, setSearchQuery] = useState("");

  const {data, isLoading, isError} = useGetInternalJobsQuery();

  useEffect(() => {
    if (isError) toast.error("Failed to load jobs. Please refresh.");
  }, [isError]);

  const filteredJobs = data?.jobs?.filter(job => 
    job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job?.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#a855f7] selection:text-white py-16">
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Build the future of <span className="text-[#a855f7]">Intelligence.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            InterVue helps hiring pioneers to bridge the gap between human potential and AI-driven recruitment.
          </p>

          <div className="relative max-w-xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input 
              type="text"
              placeholder="Search roles (e.g. Engineer, Designer)..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.section>

        <div className="grid gap-4">
          {isLoading ? (
            [1, 2, 3].map(n => (
              <div key={n} className="h-32 w-full bg-white/5 animate-pulse rounded-2xl border border-white/5" />
            ))
          ) : (
            <AnimatePresence mode='popLayout'>
              {filteredJobs?.map((job, index) => (
                <JobCard 
                  key={job._id} 
                  job={job} 
                  index={index} 
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {!isLoading && filteredJobs?.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No positions found. Try a different search term.
          </div>
        )}
      </main>

    </div>
  );
}

