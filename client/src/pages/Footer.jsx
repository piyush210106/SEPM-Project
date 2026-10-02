import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiMail, 
  FiExternalLink, 
  FiZap, 
  FiCode, 
  FiTerminal 
} from 'react-icons/fi';

/**
 * InterVue - Meet the Creator Footer
 * Tech: React, Tailwind CSS, Framer Motion
 * UX Principles: Aesthetic-Usability, Law of Proximity, Fitts's Law.
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiGithub />, label: "GitHub", href: "https://github.com/piyush210106" },
    { icon: <FiLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/piyush-garg-8733b5319" },
    { icon: <FiTwitter />, label: "Twitter", href: "#" },
    { icon: <FiMail />, label: "Email", href: "mailto:piyushgarg2101@gmail.com" },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 px-6 overflow-hidden border-t border-white/5">
      {/* Ambient background glow (Aesthetic-Usability) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-75 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Section 1: Brand & Creator Hook (Miller's Law - Chunking Information) */}
          <motion.div {...fadeInUp} className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <FiZap className="text-white text-xl" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">InterVue</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tighter">
              Engineering the <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-white">
                Future of Recruitment.
              </span>
            </h2>
            
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-medium">
              InterVue was built to solve the latency in human potential. By merging neural intelligence with seamless WebRTC interfaces, we've created the ultimate bridge between talent and opportunity.
            </p>
          </motion.div>

          {/* Section 2: Creator Stats & Details (Law of Proximity) */}
          <motion.div 
            {...fadeInUp} 
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 grid grid-cols-2 gap-8"
          >
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500">The Architect</p>
              <div className="space-y-2">
                <p className="text-xl font-bold">Piyush Garg</p>
                <p className="text-zinc-500 text-xs flex items-center gap-2">
                  <FiCode className="text-purple-400" /> Full Stack Developer
                </p>
                <p className="text-zinc-500 text-xs flex items-center gap-2">
                  <FiTerminal className="text-purple-400" /> AI/ML Enthusiast
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Vite', 'Node', 'Mongoose', 'Express', 'TailWind CSS', 'SQL', 'LangChain'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-zinc-900 border border-white/5 rounded text-[10px] font-bold text-zinc-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section 3: Contact & CTAs (Fitts's Law - Large Click Targets) */}
          <motion.div 
            {...fadeInUp} 
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Get in Touch</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all duration-300 shadow-lg group"
                    aria-label={social.label}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <button className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl">
              Collaborate <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar (Law of Similarity) */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
            © {currentYear} InterVue Systems. Designed with precision.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-zinc-600 hover:text-purple-500 text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-600 hover:text-purple-500 text-[10px] font-black uppercase tracking-widest transition-colors">Neural Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;