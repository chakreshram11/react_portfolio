import React, { useState, useEffect, useMemo } from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaEnvelope, FaFilePdf, FaChevronRight } from "react-icons/fa";
import { supabase, getStorageUrl, fetchProfileData } from "../lib/supabase";

const DEFAULT_PHRASES = [
  "Full Stack Developer",
  "Cyber Security Student",
  "Photoshop Editor",
  "Security Researcher",
];

function Home() {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Profile States
  const [fullName, setFullName] = useState("");
  const [tagline, setTagline] = useState("");
  const [photoUrl, setPhotoUrl] = useState(() => getStorageUrl("profile/photo.webp"));
  const [resumeUrl, setResumeUrl] = useState(() => getStorageUrl("documents/single_page_resume.pdf"));
  const [phrases, setPhrases] = useState(DEFAULT_PHRASES);

  // Social Links
  const [facebookUrl, setFacebookUrl] = useState("#");
  const [linkedinUrl, setLinkedinUrl] = useState("#");
  const [instagramUrl, setInstagramUrl] = useState("#");
  const [emailAddr, setEmailAddr] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const data = await fetchProfileData();
      if (data) {
        if (data.full_name) setFullName(data.full_name);
        if (data.tagline) setTagline(data.tagline);
        if (data.avatar_url) setPhotoUrl(getStorageUrl(data.avatar_url));
        if (data.resume_url) setResumeUrl(getStorageUrl(data.resume_url));
        if (Array.isArray(data.phrases) && data.phrases.length > 0) setPhrases(data.phrases);
        if (data.facebook_url) setFacebookUrl(data.facebook_url);
        if (data.linkedin_url) setLinkedinUrl(data.linkedin_url);
        if (data.instagram_url) setInstagramUrl(data.instagram_url);
        if (data.email) setEmailAddr(data.email);
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[index];

    if (!isDeleting && typedText === currentPhrase) {
      // Pause at the end of typing
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === "") {
      // Move to next phrase
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
    } else {
      // Type or delete characters
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length + (isDeleting ? -1 : 1)));
        // Adjust speed for realism
        setTypingSpeed(isDeleting ? 40 : 100 - Math.random() * 30);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, index, phrases, typingSpeed]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 md:px-14 relative overflow-x-hidden"
      style={{ background: '#030712' }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 via-indigo-500/5 to-emerald-500/5 opacity-50 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20 relative z-10 w-full pt-20 pb-10">

        {/* Left Content */}
        <div className="w-full md:w-3/5 text-center md:text-left flex flex-col items-center md:items-start">

          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-sky-400 relative" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-sky-300 uppercase">
              Welcome to my portfolio
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-2">
            Hello, It's Me
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 leading-tight pb-2">
            {fullName}
          </h2>

          <div className="mt-4 flex items-center justify-center md:justify-start min-h-[40px]">
            <p className="text-lg md:text-2xl text-slate-400 font-medium">
              And I'm a{" "}
              <span className="font-bold text-white relative">
                {typedText}
                <span className="absolute -right-3 top-0 animate-[blink_1s_infinite] text-sky-400">|</span>
              </span>
            </p>
          </div>

          <p className="mt-6 text-slate-400 text-sm md:text-base max-w-lg leading-relaxed border-l-2 border-indigo-500/30 pl-4 text-left">
            {tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 mt-10">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white rounded-xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2">
                <FaFilePdf className="text-lg" />
                Download CV
              </span>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white transition-all hover:border-slate-500 group"
            >
              View Work
              <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-10">
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase hidden sm:block mr-2">
              Connect With Me
            </span>
            {[
              { name: "Facebook", icon: FaFacebook, href: facebookUrl, color: "hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/10" },
              { name: "LinkedIn", icon: FaLinkedin, href: linkedinUrl, color: "hover:text-sky-500 hover:border-sky-500/30 hover:bg-sky-500/10" },
              { name: "Instagram", icon: FaInstagram, href: instagramUrl, color: "hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/10" },
              { name: "Email", icon: FaEnvelope, href: `mailto:${emailAddr}`, external: false, color: "hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-500/10" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={social.name}
                target={social.external !== false ? "_blank" : undefined}
                rel={social.external !== false ? "noopener noreferrer" : undefined}
                className={`w-11 h-11 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center text-slate-400 transition-all duration-300 hover:-translate-y-1 ${social.color} shadow-lg`}
              >
                <social.icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="w-full md:w-2/5 flex justify-center mt-10 md:mt-0 perspective-1000">
          <div className="relative group">

            {/* Spinning/Animated Gradient Border effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-emerald-400 opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-emerald-400 opacity-100" />

            {/* Image Container */}
            <div className="relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[420px] aspect-square rounded-full overflow-hidden border-4 border-[#030712]/50 z-10 transform transition-transform duration-500 hover:scale-[1.02] bg-gradient-to-tr from-sky-400 via-indigo-400 to-emerald-400 shadow-[inset_0_0_60px_rgba(255,255,255,0.25)]">
              {/* Dynamic texture over the neon background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/40 via-transparent to-white/10 mix-blend-overlay" />

              <img
                src={photoUrl}
                alt={fullName}
                fetchpriority="high"
                loading="eager"
                decoding="sync"
                width="420"
                height="420"
                className="relative z-10 w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              />
              {/* Inner subtle gradient overlay to blend the bottom of the photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent opacity-80 z-20 pointer-events-none" />
            </div>

            {/* Floating Badge overlay */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 z-20 glass-card rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/10 shadow-2xl flex items-center gap-2.5 sm:gap-4 animate-[slideUp_1s_ease-out_forwards]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-ping absolute" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full relative" />
              </div>
              <div>
                <p className="text-[9px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider leading-none mb-1">Status</p>
                <p className="text-[11px] sm:text-sm font-bold text-white leading-none">Open for Work</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;