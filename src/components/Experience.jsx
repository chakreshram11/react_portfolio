import React from "react";
import { FaCalendarAlt, FaFilePdf, FaBriefcase, FaClock, FaLaptopCode, FaShieldAlt, FaTools, FaChevronRight, FaRegCheckCircle } from "react-icons/fa";
import manakirana from "../asserts/manakirana.webp"
import osmsecLogo from "../asserts/osmsec.webp";
import lifeBoxLetter from "../experience/Lifebox.pdf";
import osmsec from "../experience/osmsec.pdf";
import manakiranaletter from "../experience/manakirana.pdf";
import lifeboxlogo from "../asserts/lifebox.webp";

function Experience() {
  const experiences = [
    {
      company: "Manakirana",
      role: "Full Stack Developer",
      duration: "6 months",
      logo: manakirana,
      letter: manakiranaletter,
      color: "#38bdf8", // Sky
      icon: FaLaptopCode,
      tags: ["React", "Tailwind CSS", "REST APIs", "Agile"],
      tasks: [
        "Built responsive UI components using React and Tailwind CSS.",
        "Implemented RESTful APIs and integrated backend services.",
        "Participated in code reviews and agile sprint planning.",
        "Compensation: INR 1,20,000/- (INR One Lakh Twenty Only) per annum."
      ],
    },
    {
      company: "Osmsec",
      role: "Content Engineer",
      duration: "3 months",
      logo: osmsecLogo,
      letter: osmsec,
      color: "#818cf8", // Indigo
      icon: FaShieldAlt,
      tags: ["CVE Analysis", "Scripting", "Documentation", "Security"],
      tasks: [
        "Analyzed assigned CVE numbers and validated vulnerabilities in controlled environments.",
        "Created build scripts to reproduce CVE-specific vulnerable setups.",
        <>Generated <code className="text-indigo-400 font-mono text-[10px] bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">proof.txt</code> files as proof-of-concept for confirmed CVEs.</>,
        "Documented reproduction and mitigation steps clearly and accurately.",
      ],
    },
    {
      company: "Lifebox Next Gen",
      role: "Developer",
      duration: "3 months",
      logo: lifeboxlogo,
      letter: lifeBoxLetter,
      color: "#34d399", // Emerald
      icon: FaTools,
      tags: ["Web Apps", "UX Design", "Unit Testing", "CI/CD"],
      tasks: [
        "Developed features and fixed bugs in web applications.",
        "Collaborated with designers to improve UX and performance.",
        "Wrote unit tests and improved CI workflows.",
      ],
    },
  ];

  const highlights = [
    { icon: FaBriefcase, value: "3", label: "Companies", color: "#38bdf8" },
    { icon: FaClock, value: "12+", label: "Months Experience", color: "#818cf8" },
    { icon: FaLaptopCode, value: "5+", label: "Tech Domains", color: "#34d399" },
    { icon: FaShieldAlt, value: "2", label: "Security Roles", color: "#fb923c" },
  ];

  return (
    <section
      id="experience"
      className="py-20 px-6 md:px-14 relative overflow-x-hidden"
      style={{ background: '#030712' }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/3 -left-20 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">Career Journey</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Professional <span className="accent-gradient-text">Experience</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            A track record of impactful internships across full-stack development and cybersecurity domains.
          </p>
          <div className="mt-8 w-20 h-1 mx-auto accent-gradient rounded-full opacity-80" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

          {/* Highlight Stats Row */}
          <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {highlights.map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 group hover:scale-[1.03] transition-all duration-300 border border-white/5 hover:border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `linear-gradient(45deg, ${stat.color}, transparent)` }} />
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6 border border-white/5 relative z-10 shadow-inner"
                  style={{ background: `${stat.color}15`, boxShadow: `inset 0 0 15px ${stat.color}20` }}
                >
                  <stat.icon className="text-xl sm:text-2xl" style={{ color: stat.color }} />
                </div>
                <div className="text-center sm:text-left relative z-10">
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.value}</span>
                  <p className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Cards */}
          {experiences.map((exp, i) => {
            // Determine sizing: Row 1 = 7 + 5. Row 2 = 8 + 4
            const colSpan = i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : 'md:col-span-8';

            return (
              <div
                key={i}
                className={`${colSpan} glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-1.5 flex flex-col border border-white/5 relative`}
                style={{
                  boxShadow: `0 4px 30px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.02)`,
                }}
              >
                {/* Glow behind card on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${exp.color}, transparent 80%)` }}
                />

                {/* Top accent bar */}
                <div className="h-1.5 w-full relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
                </div>

                <div className="p-8 sm:p-10 flex flex-col flex-1 relative z-10">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-8 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-5">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center p-3 border shadow-inner transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3 bg-white/[0.02]"
                        style={{ borderColor: `${exp.color}20` }}
                      >
                        <img src={exp.logo} alt={`${exp.company} Logo`} loading="lazy" decoding="async" width="64" height="64" className="w-full h-full object-contain filter drop-shadow-md" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white tracking-wide">{exp.company}</h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <exp.icon className="text-sm" style={{ color: exp.color }} />
                          <span className="text-sm font-medium text-slate-400">{exp.role}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm self-start"
                      style={{
                        background: `${exp.color}15`,
                        color: exp.color,
                        border: `1px solid ${exp.color}30`,
                      }}
                    >
                      <FaCalendarAlt className="text-xs" /> {exp.duration}
                    </span>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {exp.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 cursor-default bg-white/[0.03] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Tasks */}
                  <ul className="space-y-4 flex-1 mb-8">
                    {exp.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-3 group/task">
                        <div
                          className="mt-1 flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0 border transition-colors"
                          style={{ borderColor: `${exp.color}50`, background: `${exp.color}10` }}
                        >
                          <FaRegCheckCircle className="text-[8px] opacity-70 group-hover/task:opacity-100 transition-opacity" style={{ color: exp.color }} />
                        </div>
                        <span className="leading-relaxed text-sm text-slate-300 group-hover/task:text-slate-100 transition-colors">
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="mt-auto pt-5 flex justify-between items-center border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_#34d399] animate-pulse" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed</span>
                    </div>
                    <a
                      href={exp.letter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-300 overflow-hidden relative shadow-md"
                      style={{
                        background: `${exp.color}15`,
                        color: exp.color,
                        border: `1px solid ${exp.color}30`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${exp.color}25`;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${exp.color}15`;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <FaFilePdf className="text-sm group-hover/btn:-translate-y-0.5 transition-transform" />
                      View Letter
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Summary Impact Card */}
          <div className="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-sky-500/20 transition-all duration-700" />

            <div className="flex flex-col items-center text-center relative z-10 mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500 relative">
                <div className="absolute inset-0 rounded-2xl accent-gradient opacity-20" />
                <FaBriefcase className="text-3xl text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)] relative z-10" />
              </div>
              <span className="text-5xl font-black text-white tracking-tighter mb-2">12<span className="text-sky-400">+</span></span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Months</span>
              <span className="text-sm font-semibold text-slate-300 mt-1">Professional Experience</span>
            </div>

            <div className="mt-auto relative z-10 w-full pt-6 border-t border-white/5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Journey Highlights</p>
              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <div key={i} className="flex items-center justify-between group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shadow-sm transition-transform duration-300 group-hover/item:scale-150" style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}` }} />
                      <span className="text-xs font-semibold text-slate-400 group-hover/item:text-slate-200 transition-colors">{exp.company}</span>
                    </div>
                    <FaChevronRight className="text-[8px] text-slate-600 group-hover/item:text-slate-400 group-hover/item:translate-x-1 transition-all" />
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

export default Experience;