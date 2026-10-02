import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  FiPlusCircle, 
  FiVideo, 
  FiFileText, 
  FiMenu, 
  FiX, 
  FiZap, 
  FiBell,
  FiChevronDown
} from 'react-icons/fi';



const NavbarRec = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('AddJob');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'AddJob', icon: <FiPlusCircle />, label: 'Add Job', path:"/recruiter/addjob" },
    { name: 'Interviews', icon: <FiVideo />, label: 'Interviews', path:"/recruiter/interviews" },
    { name: 'Applications', icon: <FiFileText />, label: 'Applications', path:"/recruiter/applications" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-purple-500/20 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">
            <FiZap className="text-white text-xl" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Inter<span className="text-purple-500">Vue</span>
          </span>
          <span className="hidden sm:block ml-2 px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            Recruiter
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
                activeTab === item.name ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
              
              {activeTab === item.name && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-purple-600/10 border border-purple-500/50 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </NavLink>
          ))}
        </div>

        {/* ACTION BUTTONS (Fitts's Law: Grouped targets) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2.5 text-zinc-500 hover:text-purple-400 transition-colors relative">
            <FiBell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-black" />
          </button>
          
          <div className="h-8 w-px bg-white/10 mx-2" />
          
          {/* <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full bg-zinc-900 border border-white/5 hover:border-purple-500/50 transition-all group">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-600 to-purple-400 flex items-center justify-center font-bold text-xs">
              JD
            </div>
            <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Jane Doe</span>
            <FiChevronDown className="mr-2 text-zinc-600 group-hover:text-purple-400 transition-colors" />
          </button> */}
        </div>

        {/* MOBILE TOGGLE (Hick's Law: Simple interface) */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU (Miller's Law: Reduced options per view) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-b border-purple-500/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {menuItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                    activeTab === item.name 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' 
                      : 'text-zinc-500 bg-white/5'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
              <div className="h-px bg-white/5 my-2" />
              {/* <button className="flex items-center justify-between p-4 bg-zinc-900 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">JD</div>
                  <span className="font-bold text-white uppercase tracking-tighter">Jane Doe</span>
                </div>
                <span className="text-purple-400 text-xs font-black uppercase tracking-widest">Profile</span>
              </button> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarRec;