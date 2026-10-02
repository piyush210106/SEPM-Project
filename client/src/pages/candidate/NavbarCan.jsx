import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  FiBriefcase, 
  FiGlobe, 
  FiCheckSquare, 
  FiVideo, 
  FiUser, 
  FiMenu, 
  FiX, 
  FiZap,
  FiBell
} from 'react-icons/fi';


const NavbarCan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('InJobs');

  // Handle scroll effect for aesthetic usability (subtle border appearance)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'InJobs', icon: <FiBriefcase />, label: 'Internal Jobs', path: "/candidate/injobs"},
    { name: 'ExJobs', icon: <FiGlobe />, label: 'External Jobs', path: "/candidate/exjobs"},
    { name: 'Applied', icon: <FiCheckSquare />, label: 'My Applications', path: "/candidate/appliedjobs"},
    { name: 'Interviews', icon: <FiVideo />, label: 'Interviews', path: "/candidate/interviews"},
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-purple-500/30 py-3' : 'bg-black py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO (Jakob's Law: Standard left placement) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform">
            <FiZap className="text-white text-xl" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Inter<span className="text-purple-500">Vue</span>
          </span>
          <span className="hidden sm:block ml-2 px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            Candidate
          </span>

        </motion.div>

        {/* DESKTOP LINKS (Law of Similarity & Proximity) */}
        <div className="hidden md:flex items-center bg-zinc-900/50 border border-white/10 rounded-2xl p-1.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setActiveTab(link.name)}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
                activeTab === link.name ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
              {activeTab === link.name && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-purple-600/20 border border-purple-500/50 rounded-xl -z-10"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
            </NavLink>
          ))}
        </div>

        {/* ACTIONS (Fitts's Law: Clear targets) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="relative p-2.5 text-gray-400 hover:text-purple-400 transition-colors">
            <FiBell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-black" />
          </button>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full bg-zinc-900 border border-white/10 hover:border-purple-500/50 transition-all">
            <span className="text-sm font-medium text-gray-300 ml-2">Piyush Garg</span>
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold">
              AC
            </div>
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU (Hick's Law: Simple vertical list) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-b border-purple-500/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setActiveTab(link.name);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                    activeTab === link.name 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'text-gray-400 bg-white/5'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <div className="flex items-center justify-between p-4 bg-purple-900/10 rounded-2xl border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">AC</div>
                  <span className="font-bold">Alex Chen</span>
                </div>
                <button className="text-purple-400 text-sm font-bold underline">Logout</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarCan;