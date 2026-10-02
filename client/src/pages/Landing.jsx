import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCpu, 
  FiVideo, 
  FiGlobe, 
  FiPlusCircle, 
  FiCheckCircle, 
  FiUsers, 
  FiArrowRight, 
  FiMenu, 
  FiX,
  FiZap,
  FiSearch
} from 'react-icons/fi';
import { googleLogin } from '../auth/authService.js';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Landing = () => {

    const navigate = useNavigate();
    const handleLogin = async (role) => {

    try {
        const {idToken} = await googleLogin();
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            {role},
            {
                headers: {
                    Authorization: `Bearer ${idToken}`
                },
                withCredentials: true
            }
        );

        if(res.data.onboardingRequired){
          toast.success("Welcome! Let's complete your profile");
          navigate(`${res.data.role}/signUp`);
        }
        else{
            toast.success("Login successful");
            if(res.data.role === "candidate") navigate(`${res.data.role}/injobs`);
            else navigate(`/recruiter/addjob`);
        }

    } catch (error) {
        console.log("Error in login", error);
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }

}

    
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('recruiter');

  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 py-16">
      
      {/* --- NAVIGATION (Jakob's Law: Familiar placement) --- */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <FiZap className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold tracking-tighter">Inter<span className="text-purple-500">Vue</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#ai" className="hover:text-purple-400 transition-colors">AI Engine</a>
            <a href="#video" className="hover:text-purple-400 transition-colors">Video Call</a>
            <button onClick={() => handleLogin("recruiter")} className="px-5 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
              Recruiter
            </button >
            <button onClick={() => handleLogin("candidate")} className="px-5 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
              Candidate
            </button >
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <FiCpu className="animate-pulse" /> Next-Gen AI Recruitment
          </motion.div>
          
          <motion.h1 
            {...fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Hire Smarter, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
              Not Harder.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10"
          >
            The all-in-one platform for AI-powered résumé shortlisting, WebRTC video interviews, and global job distribution.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 text-white font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 group">
              Get Started for Free <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors font-bold text-lg">
              Watch 2min Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- DASHBOARD PREVIEW (Aesthetic Usability) --- */}
      <section className="px-6 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-zinc-900/50 p-2 backdrop-blur-sm shadow-2xl"
        >
          <div className="bg-black rounded-xl border border-white/5 overflow-hidden">
             {/* Mock Dashboard UI */}
            <div className="flex border-b border-white/5 h-12 items-center px-4 gap-4">
               <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
               </div>
               <div className="flex-1 text-center text-xs text-gray-500">app.intervue.io/dashboard/active-jobs</div>
            </div>
            <div className="grid grid-cols-12 gap-0 min-h-[400px]">
              <div className="col-span-3 border-r border-white/5 p-4 hidden md:block">
                 <div className="h-4 w-24 bg-zinc-800 rounded mb-6" />
                 <div className="space-y-4">
                    {[1,2,3,4].map(i => <div key={i} className="h-3 w-full bg-zinc-900 rounded" />)}
                 </div>
              </div>
              <div className="col-span-12 md:col-span-9 p-6">
                 <div className="flex justify-between mb-8">
                    <div className="h-8 w-40 bg-purple-900/20 rounded border border-purple-500/20" />
                    <div className="h-8 w-24 bg-zinc-800 rounded" />
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="h-32 bg-zinc-900 rounded-lg animate-pulse" />
                    <div className="h-32 bg-zinc-900 rounded-lg animate-pulse" />
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURES GRID (Hick's Law: Structured & Scannable) --- */}
      <section id="features" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400">Everything you need to manage the modern recruitment lifecycle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiPlusCircle />,
                title: "Job Creation",
                desc: "Recruiters can draft and publish internal jobs with custom screening questions."
              },
              {
                icon: <FiSearch />,
                title: "Internal Portal",
                desc: "A dedicated dashboard for applicants to browse, filter, and track their applications."
              },
              {
                icon: <FiGlobe />,
                title: "External API Integration",
                desc: "Don't limit your search. Fetch and sync jobs from LinkedIn, Indeed, and more."
              },
              {
                icon: <FiCpu />,
                title: "AI Shortlisting",
                desc: "Our neural engine ranks résumés based on JD match and skill density automatically."
              },
              {
                icon: <FiCheckCircle />,
                title: "Manual Control",
                desc: "Review AI suggestions and move candidates through custom pipeline stages."
              },
              {
                icon: <FiVideo />,
                title: "In-App Interviews",
                desc: "Conduct crystal-clear video interviews powered by WebRTC. No downloads needed."
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-black border border-white/5 hover:border-purple-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RECRUITER VS APPLICANT (Law of Proximity) --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Two Sides, One Hub.</h2>
              <p className="text-gray-400">Optimized flows for every user in the ecosystem.</p>
            </div>
            
            {/* Toggle (Miller's Law: Chunking) */}
            <div className="bg-zinc-900 p-1 rounded-xl flex">
              <button 
                onClick={() => setActiveTab('recruiter')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'recruiter' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                For Recruiters
              </button>
              <button 
                onClick={() => setActiveTab('applicant')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'applicant' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                For Applicants
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 md:p-12"
            >
              {activeTab === 'recruiter' ? (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <FiUsers className="text-purple-500" /> Source Talent Instantly
                    </h3>
                    <ul className="space-y-4">
                      {['Drag & drop résumé parsing', 'Automated interview scheduling', 'Custom evaluation rubrics', 'Team collaboration notes'].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <FiCheckCircle className="mt-1 text-green-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent" />
                     <span className="text-xs text-zinc-500 font-mono italic">Recruiter_Dashboard_V2.png</span>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <FiSearch className="text-purple-500" /> Your Dream Job Awaits
                    </h3>
                    <ul className="space-y-4">
                      {['Real-time status tracking', 'One-click apply to external roles', 'AI-driven profile matching', 'In-browser interview workspace'].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <FiCheckCircle className="mt-1 text-green-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                     <span className="text-xs text-zinc-500 font-mono italic">Applicant_Portal_Home.png</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- WEBRTC HIGHLIGHT (Doherty Threshold: Visualizing speed) --- */}
      <section id="video" className="py-20 px-6 bg-purple-600 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <h2 className="text-4xl font-black mb-6">Zero Latency Interviews.</h2>
            <p className="text-purple-100 text-lg mb-8 opacity-90">
              Stop fighting with meeting links. Our WebRTC-powered video engine is baked right into the platform. Record, transcribe, and assess in real-time without ever leaving your browser.
            </p>
            <div className="flex gap-4">
               <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="font-bold text-2xl mb-1">4K</div>
                  <div className="text-xs uppercase tracking-widest opacity-70">Quality</div>
               </div>
               <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="font-bold text-2xl mb-1">&lt;200ms</div>
                  <div className="text-xs uppercase tracking-widest opacity-70">Latency</div>
               </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="bg-black p-4 rounded-2xl shadow-3xl border border-white/20 rotate-3 transform hover:rotate-0 transition-transform duration-500">
               <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square bg-zinc-800 rounded-lg flex items-end p-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <span className="text-xs z-20 font-bold">Interviewer (You)</span>
                  </div>
                  <div className="aspect-square bg-zinc-700 rounded-lg flex items-end p-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <span className="text-xs z-20 font-bold">Candidate #402</span>
                    <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 rounded text-[10px] font-bold">LIVE</div>
                  </div>
               </div>
               <div className="mt-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"><FiX /></div>
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center"><FiVideo /></div>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 rounded-lg text-xs font-bold">Finish Evaluation</button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (Fitts's Law: Large Targets) --- */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto py-20 bg-zinc-950 rounded-[3rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
             <FiZap size={200} className="text-purple-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Ready to revolutionize <br />your hiring?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-xl shadow-xl shadow-purple-900/20 transform transition-all active:scale-95">
              Start Free Trial
            </button>
            <button className="px-10 py-5 bg-transparent border border-white/20 hover:border-purple-500 text-white rounded-2xl font-bold text-xl transition-all">
              Schedule Demo
            </button>
          </div>
          <p className="mt-8 text-zinc-500 text-sm">No credit card required. Setup in 2 minutes.</p>
        </div>
      </section>

      {/* --- FOOTER (Law of Similarity: Consistent Icons/Spacing) --- */}
      <footer className="border-t border-white/5 bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <FiZap className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">InterVue</span>
            </div>
            <p className="text-zinc-500 text-sm">
              The AI layer for modern recruiting. Built for speed, precision, and fairness.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Platform</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-purple-400">Recruiter Tools</a></li>
              <li><a href="#" className="hover:text-purple-400">Job Boards</a></li>
              <li><a href="#" className="hover:text-purple-400">AI Scoring</a></li>
              <li><a href="#" className="hover:text-purple-400">Video API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-purple-400">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400">Privacy</a></li>
              <li><a href="#" className="hover:text-purple-400">Terms</a></li>
              <li><a href="#" className="hover:text-purple-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Social</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-purple-400">Twitter / X</a></li>
              <li><a href="#" className="hover:text-purple-400">LinkedIn</a></li>
              <li><a href="#" className="hover:text-purple-400">GitHub</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-60 bg-black p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="text-2xl font-bold">Inter<span className="text-purple-500">Vue</span></span>
               <button onClick={() => setIsMenuOpen(false)}><FiX size={32}/></button>
            </div>
            <div className="flex flex-col gap-8 text-2xl font-bold">
               <a href="#" onClick={() => setIsMenuOpen(false)}>Features</a>
               <a href="#" onClick={() => setIsMenuOpen(false)}>AI Engine</a>
               <a href="#" onClick={() => setIsMenuOpen(false)}>Video Call</a>
               <div className="h-px bg-white/10 w-full" />
               <button className="w-full py-4 bg-purple-600 rounded-xl">Try InterVue</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Landing;