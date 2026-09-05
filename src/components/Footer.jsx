import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaEnvelope, FaHeart, FaArrowUp, FaCircle, FaGithub } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-10 overflow-x-hidden" style={{ background: '#030712' }}>

      {/* Massive Faded Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        <span className="text-[18vw] font-black text-white/[0.015] tracking-tighter whitespace-nowrap block">
          CHAKRESH
        </span>
      </div>

      {/* Animated Top Border Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
      <div className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent animate-shimmer" style={{ animationDuration: '3s' }} />

      {/* Ambient Glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

        {/* Brand & Description */}
        <div className="md:col-span-5 text-center md:text-left flex flex-col items-center md:items-start">
          <div
            className="text-4xl font-black tracking-tighter mb-4 cursor-pointer inline-block group"
            onClick={scrollToTop}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 transition-all duration-300 group-hover:to-white">Chakresh</span>
            <span className="text-sky-400 group-hover:text-emerald-400 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">.</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md">
            <FaCircle className="text-[8px] text-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Available for Opportunities</span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Bridging the gap between robust cybersecurity practices and scalable full-stack development. Let's build something secure and beautiful.
          </p>
        </div>

        {/* Navigation */}
        <div className="md:col-span-3 text-center md:text-left flex flex-col md:items-start items-center">
          <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Explore</h3>
          <ul className="space-y-4">
            {["Home", "About", "Skills", "Experience", "Projects", "Certifications"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleSmoothScroll(e, `#${link.toLowerCase()}`)}
                  className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-sky-400 transition-all duration-300"
                >
                  <span className="w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-3" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials & Connect */}
        <div className="md:col-span-4 text-center md:text-left flex flex-col md:items-start items-center">
          <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Connect</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-xs leading-relaxed">
            Reach out for collaborations, security audits, or just a friendly chat.
          </p>
          <div className="flex gap-4">
            {[
              { name: "GitHub", icon: FaGithub, href: "https://github.com/chakreshram11", color: "hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]" },
              { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/chakresh-ram-kudupudi-85a6a0256/", color: "hover:bg-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]" },
              { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/chakreshram/", color: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:shadow-[0_0_20px_rgba(220,39,67,0.4)]" },
              { name: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/chakresh.ram.1", color: "hover:bg-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]" },
              { name: "Email", icon: FaEnvelope, href: "mailto:chakreshram11@gmail.com", color: "hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]" },
            ].map((social, i) => (
               <a
                key={i}
                href={social.href}
                aria-label={social.name}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className={`w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:-translate-y-2 hover:text-white group ${social.color}`}
              >
                <social.icon className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 mt-20 relative z-10">
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-xs font-semibold text-slate-500 tracking-wide">
            &copy; {currentYear} Chakresh Ram Kudupudi. All Rights Reserved.
          </p>

          <p className="text-xs font-semibold text-slate-500 flex items-center gap-2">
            Built with <FaHeart className="text-rose-500/80 animate-pulse" /> using React & Tailwind
          </p>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all duration-300"
            aria-label="Back to top"
          >
            <FaArrowUp className="text-slate-400 group-hover:text-sky-400 group-hover:-translate-y-1 transition-all duration-300" />
          </button>

        </div>
      </div>
    </footer>
  );
}

export default Footer;