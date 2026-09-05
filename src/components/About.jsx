import React, { useState, useEffect, useMemo } from "react";
import { FaShieldAlt, FaCode, FaCertificate, FaBriefcase, FaRocket, FaGraduationCap, FaQuoteLeft } from "react-icons/fa";
import { supabase, fetchProfileData } from "../lib/supabase";

const DEFAULT_TECH_STACK = [
  { name: "React", color: "#61dafb" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "Python", color: "#3776ab" },
  { name: "Node.js", color: "#68a063" },
  { name: "HTML", color: "#e34f26" },
  { name: "CSS", color: "#264de4" },
  { name: "Flask", color: "#ffffff" },
  { name: "Firebase", color: "#ffca28" },
  { name: "Kali Linux", color: "#557c94" },
  { name: "Java", color: "#ed8b00" },
  { name: "Express", color: "#ffffff" },
  { name: "Tailwind", color: "#38bdf8" },
];

const COLOR_MAP = {
  react: "#61dafb",
  javascript: "#f7df1e",
  js: "#f7df1e",
  python: "#3776ab",
  "node.js": "#68a063",
  node: "#68a063",
  html: "#e34f26",
  css: "#264de4",
  flask: "#ffffff",
  firebase: "#ffca28",
  "kali linux": "#557c94",
  kali: "#557c94",
  java: "#ed8b00",
  express: "#ffffff",
  tailwind: "#38bdf8",
  typescript: "#3178c6",
  docker: "#2496ed",
  cpp: "#00599c",
  c: "#a8b9cc",
  git: "#f05032",
  github: "#a855f7",
  scapy: "#38bdf8",
  burpsuite: "#ff6600",
  wireshark: "#1679a7",
  linux: "#fcb400",
  aws: "#ff9900",
};

function getTechColor(name) {
  const clean = String(name || "").toLowerCase().trim();
  return COLOR_MAP[clean] || "#38bdf8";
}

function About() {
  const [profile, setProfile] = useState(null);
  const [liveCounts, setLiveCounts] = useState({
    projects: null,
    certifications: null,
    experiences: null,
    research: null,
  });

  useEffect(() => {
    async function loadData() {
      const data = await fetchProfileData();
      if (data) {
        let parsedAbout = {};
        if (data.about_json) {
          try {
            parsedAbout = typeof data.about_json === "string" ? JSON.parse(data.about_json) : data.about_json;
          } catch (e) {
            console.warn("Failed parsing about_json:", e);
          }
        }
        setProfile({ ...data, ...parsedAbout });
      }

      // Fetch live table counts automatically from Supabase tables
      try {
        const [projRes, certRes, expRes, resRes] = await Promise.all([
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("certifications").select("id", { count: "exact", head: true }),
          supabase.from("experiences").select("id", { count: "exact", head: true }),
          supabase.from("research").select("id", { count: "exact", head: true }),
        ]);

        setLiveCounts({
          projects: projRes.count !== null && projRes.count > 0 ? `${projRes.count}+` : null,
          certifications: certRes.count !== null && certRes.count > 0 ? `${certRes.count}+` : null,
          experiences: expRes.count !== null && expRes.count > 0 ? `${expRes.count}+` : null,
          research: resRes.count !== null && resRes.count > 0 ? `${resRes.count}` : null,
        });
      } catch (err) {
        console.warn("Error fetching live table stats:", err);
      }
    }
    loadData();
  }, []);

  // Resolved Dynamic Values with Fallbacks
  const degree1 = profile?.degree1 || "B.Tech (2026) — Cyber Security";
  const degree2 = profile?.degree2 || "Diploma (2023) — Computer Engineering";
  const bioText = profile?.about_bio || "I am a dedicated cybersecurity and full-stack development enthusiast with a strong focus on building secure, scalable applications. I thrive at the intersection of development and security — writing code that's resilient by design.";

  const whoIAmBadges = useMemo(() => {
    if (profile?.who_i_am_badges) {
      if (Array.isArray(profile.who_i_am_badges)) return profile.who_i_am_badges;
      return String(profile.who_i_am_badges).split(",").map((s) => s.trim()).filter(Boolean);
    }
    return ["Full Stack Dev", "Cyber Security", "Ethical Hacking"];
  }, [profile]);

  const stats = [
    { icon: FaBriefcase, value: profile?.stat_internships || liveCounts.experiences || "3+", label: "Internships", color: "#38bdf8" },
    { icon: FaCertificate, value: profile?.stat_certifications || liveCounts.certifications || "8+", label: "Certifications", color: "#818cf8" },
    { icon: FaCode, value: profile?.stat_projects || liveCounts.projects || "3+", label: "Projects", color: "#34d399" },
    { icon: FaShieldAlt, value: profile?.stat_vulns || liveCounts.research || "2", label: "Vulns Found", color: "#fb923c" },
  ];

  const terminalCerts = useMemo(() => {
    if (profile?.terminal_certs) {
      if (Array.isArray(profile.terminal_certs)) return profile.terminal_certs;
      return String(profile.terminal_certs).split("\n").map((s) => s.trim()).filter(Boolean);
    }
    return [
      "Cyber Security Awareness Training — Amazon",
      "Introduction to AI — Great Learning",
      "Zscaler Networking Virtual Internship — AICTE",
      "Palo Alto Cybersecurity Virtual Internship — AICTE",
    ];
  }, [profile]);

  const goalShort = profile?.goal_short || "Secure a role in cybersecurity.";
  const goalLong = profile?.goal_long || "Grow into a senior security engineer while continuously learning.";

  const techStack = useMemo(() => {
    if (profile?.tech_stack_items) {
      const rawList = Array.isArray(profile.tech_stack_items)
        ? profile.tech_stack_items
        : String(profile.tech_stack_items).split(",").map((s) => s.trim()).filter(Boolean);

      if (rawList.length > 0) {
        return rawList.map((item) => ({ name: item, color: getTechColor(item) }));
      }
    }
    return DEFAULT_TECH_STACK;
  }, [profile]);

  const currentFocus = useMemo(() => {
    if (profile?.current_focus_items) {
      if (Array.isArray(profile.current_focus_items)) return profile.current_focus_items;
      return String(profile.current_focus_items).split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
    }
    return ["Security Research", "Full Stack Projects", "Cloud Platforms"];
  }, [profile]);

  return (
    <section id="about" className="py-20 px-6 md:px-14 relative overflow-x-hidden" style={{ background: '#030712' }}>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">Get to know me</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="accent-gradient-text">Me</span>
          </h2>
          <div className="mt-8 w-20 h-1 mx-auto accent-gradient rounded-full opacity-80" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

          {/* Bio Card - Large */}
          <div className="md:col-span-7 glass-card rounded-2xl p-8 sm:p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-500">
            {/* Inner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 group-hover:bg-sky-500/20 transition-all duration-700" />

            <FaQuoteLeft className="absolute right-8 bottom-8 text-8xl text-white/[0.02] -rotate-12 pointer-events-none" />

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-sky-500/20 shadow-[inset_0_0_15px_rgba(56,189,248,0.15)] bg-sky-500/10">
                <FaGraduationCap className="text-xl text-sky-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-wide">Who I Am</h3>
                <p className="text-xs text-sky-400 uppercase tracking-widest font-semibold mt-1.5">{degree1}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-1">{degree2}</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-base relative z-10 mb-8 whitespace-pre-line">
              {bioText}
            </p>

            <div className="flex flex-wrap gap-3 relative z-10">
              {whoIAmBadges.map((badge, idx) => {
                const colors = [
                  "bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.1)]",
                  "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(129,140,248,0.1)]",
                  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]",
                ];
                return (
                  <span
                    key={idx}
                    className={`text-xs font-bold px-4 py-2 rounded-lg border ${colors[idx % colors.length]}`}
                  >
                    {badge}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 border border-white/5 hover:border-white/10 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${stat.color}, transparent 70%)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6 border border-white/5 relative z-10"
                  style={{ background: `${stat.color}15`, boxShadow: `inset 0 0 15px ${stat.color}20` }}
                >
                  <stat.icon className="text-xl" style={{ color: stat.color }} />
                </div>
                <span className="text-3xl font-black text-white relative z-10 tracking-tight">{stat.value}</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2 relative z-10">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Terminal Card */}
          <div className="md:col-span-8 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-sky-500/20 group relative transition-all duration-500 hover:border-sky-500/40"
            style={{ background: 'rgba(5, 9, 20, 0.9)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center px-5 py-3 border-b border-white/5 backdrop-blur-md"
              style={{ background: 'rgba(17, 24, 39, 0.8)' }}
            >
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              </div>
              <span className="ml-auto text-slate-400 text-xs font-mono font-semibold tracking-widest flex items-center gap-2">
                <FaCode className="text-sky-500" /> about-me.sh
              </span>
            </div>

            <div className="p-8 font-mono text-sm space-y-6">
              <div>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">guest@chakresh</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-indigo-400 font-bold">~/portfolio</span>
                  <span className="text-slate-500">$</span>
                  <span className="text-sky-300">cat certifications.txt</span>
                </p>
                <div className="ml-6 mt-3 text-slate-400 space-y-2 border-l-2 border-slate-800 pl-4">
                  {terminalCerts.map((line, idx) => {
                    const parts = line.split("—");
                    const title = parts[0] ? parts[0].trim() : line;
                    const org = parts[1] ? parts[1].trim() : "";
                    return (
                      <p key={idx} className="hover:text-slate-300 transition-colors">
                        {title}
                        {org && <span className="text-slate-600 font-sans text-xs uppercase tracking-wider ml-2">— {org}</span>}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">guest@chakresh</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-indigo-400 font-bold">~/portfolio</span>
                  <span className="text-slate-500">$</span>
                  <span className="text-sky-300">echo $GOALS</span>
                </p>
                <p className="ml-6 mt-3 text-slate-300 leading-relaxed border-l-2 border-slate-800 pl-4">
                  <span className="text-sky-400 font-bold">Short-term:</span> {goalShort}<br/>
                  <span className="text-indigo-400 font-bold">Long-term:</span> {goalLong}
                </p>
              </div>

              <p className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">guest@chakresh</span>
                <span className="text-slate-500">:</span>
                <span className="text-indigo-400 font-bold">~/portfolio</span>
                <span className="text-slate-500">$</span>
                <span className="w-2.5 h-5 bg-sky-400 animate-pulse inline-block align-middle" />
              </p>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="md:col-span-4 glass-card rounded-2xl p-8 relative overflow-hidden group hover:border-white/10 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-indigo-500/20 shadow-[inset_0_0_15px_rgba(129,140,248,0.15)] bg-indigo-500/10">
                <FaCode className="text-xl text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide">Tech Stack</h3>
            </div>

            <div className="flex flex-wrap gap-2.5 relative z-10">
              {techStack.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-default hover:shadow-[0_0_15px_currentColor]"
                  style={{
                    background: `${tech.color}15`,
                    color: tech.color,
                    border: `1px solid ${tech.color}30`,
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Mini Goals */}
            <div className="mt-8 pt-6 relative z-10 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
                  <FaRocket className="text-emerald-400 text-sm" />
                </div>
                <h4 className="text-white font-bold text-sm tracking-wide">Current Focus</h4>
              </div>
              <div className="space-y-3 pl-1">
                {currentFocus.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#34d399] group-hover/item:scale-150 transition-transform" />
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider group-hover/item:text-slate-200 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;