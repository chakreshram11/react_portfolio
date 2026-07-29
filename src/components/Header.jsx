import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    setIsOpen(false);
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-14">

        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter group cursor-pointer" onClick={(e) => handleSmoothScroll(e, "#home")}>
          <span className="text-white transition-colors group-hover:text-slate-200">Chakresh</span>
          <span className="text-sky-400 group-hover:text-emerald-400 transition-colors">.</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="relative px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 rounded-full hover:text-white transition-all duration-300 group"
            >
              {link.name}
              {/* Hover Pill Effect */}
              <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </nav>

        {/* Contact CTA Button (Desktop) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-widest rounded-full border border-sky-500/30 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:border-sky-500/60"
          >
            <div className="absolute inset-0 bg-sky-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle navigation"
          className="md:hidden text-slate-300 hover:text-white p-2 focus:outline-none transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>

      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] border-b border-white/10" : "max-h-0"
        }`}
        style={{
          background: 'rgba(3, 7, 18, 0.95)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="flex flex-col px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="mt-4 text-sm font-bold uppercase tracking-widest text-center text-sky-400 bg-sky-500/10 border border-sky-500/30 py-4 rounded-xl hover:bg-sky-500/20 transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;