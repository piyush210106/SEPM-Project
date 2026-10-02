import React from 'react';
import { motion } from 'framer-motion';
import {
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiCpu,
  FiZap,
  FiActivity,
  FiChevronRight
} from 'react-icons/fi';


export default function AppliedJobCard(application) {
    application = application?.application;
    const job = application.jobId;
    const date = new Date(application.createdAt);
    const formattedDate = date.toLocaleDateString("en-IN");
    const aiScore = application?.aiScore;
    const hasAiScore = aiScore?.score != null;

  return (
    <div className="w-full bg-black p-4 md:p-4 font-sans antialiased text-white">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-[#0a0a0a] border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl hover:border-purple-500/30 transition-all"
      >
        <div className="flex flex-col lg:flex-row">

          {/* LEFT CONTENT: Role & Intelligence */}
          <div className="flex-1 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/20 p-3 rounded-xl border border-purple-500/30">
                  <FiBriefcase className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {job.title}
                  </h2>
                  <p className="text-gray-400 text-sm font-medium">{job.company}</p>
                </div>
              </div>

              <div className="hidden sm:flex gap-3 text-gray-500 font-bold text-[10px] uppercase tracking-wider">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-md border border-white/5">
                  <FiMapPin className="text-purple-500" /> {job.location.city}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-md border border-white/5">
                  <FiClock className="text-purple-500" /> {formattedDate}
                </div>
              </div>
            </div>

            {/* INTELLIGENCE REPORT */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                <FiZap className={hasAiScore ? "animate-pulse" : ""} />
                Intelligence Report
              </div>
              <div className="p-5 bg-purple-500/5 rounded-xl border border-purple-500/10 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <FiCpu size={100} />
                </div>
                {hasAiScore ? (
                  <>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed italic relative z-10">
                      "{aiScore.analysis}"
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {aiScore.overallFit && (
                        <span className="px-2 py-0.5 bg-purple-500/10 rounded text-[9px] font-bold text-purple-400 border border-purple-500/20 uppercase">
                          Fit: {aiScore.overallFit}
                        </span>
                      )}
                      {aiScore.matchedSkills?.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-purple-500/10 rounded text-[9px] font-bold text-purple-400 border border-purple-500/20 uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3 relative z-10">
                    <FiCpu className="text-purple-500 animate-spin" size={16} />
                    <p className="text-sm text-zinc-500 font-medium">AI analysis is processing your application...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: Scoring & Analytics */}
          <div className="w-full lg:w-[320px] p-6 md:p-8 bg-white/1 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Match Score Display */}
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 text-center lg:text-left">Match Confidence</p>
                {hasAiScore ? (
                  <>
                    <div className="flex items-baseline justify-center lg:justify-start gap-1">
                      <span className="text-5xl font-black text-white tracking-tighter">
                        {aiScore.score}
                      </span>
                      <span className="text-lg font-bold text-purple-500">%</span>
                    </div>

                    <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${aiScore.score}%` }}
                        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                        className="h-full bg-purple-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline justify-center lg:justify-start gap-1">
                      <span className="text-5xl font-black text-zinc-700 tracking-tighter">--</span>
                      <span className="text-lg font-bold text-zinc-700">%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden border border-white/5">
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="h-full w-1/3 bg-purple-500/30 rounded-full"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Status Indicator */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span>Current Phase</span>
                  <FiActivity className="text-purple-500" />
                </div>
                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group cursor-default">
                  <span className="text-xs font-bold tracking-tight text-gray-200">{application.status.toUpperCase()}</span>
                  <FiChevronRight className="text-gray-600 group-hover:text-purple-500 transition-colors" />
                </div>
              </div>
            </div>

            {/* Application Meta */}
            <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">Reference</span>
                <span className="text-[10px] font-mono text-gray-400">{application._id?.toString().slice(-6)}</span>
              </div>
              <button className="text-[10px] font-bold text-gray-600 hover:text-red-500 transition-colors uppercase tracking-widest">
                Withdraw
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
