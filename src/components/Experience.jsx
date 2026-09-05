import React, { useEffect, useState, useMemo } from "react";
import { FaCalendarAlt, FaFilePdf, FaBriefcase, FaClock, FaLaptopCode, FaShieldAlt, FaTools, FaChevronRight, FaRegCheckCircle, FaPlus } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const DEFAULT_EXPERIENCES = [
  {
    company: "Manakirana",
    role: "Full Stack Developer",
    duration: "6 months",
    logo: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/experiences/manakirana_logo.webp",
    letter: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/experiences/manakirana_letter.pdf",
    color: "#38bdf8",
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
    logo: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/experiences/osmsec_logo.webp",
    letter: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/experiences/osmsec_letter.pdf",
    color: "#818cf8",
    icon: FaShieldAlt,
    tags: ["CVE Analysis", "Scripting", "Documentation", "Security"],
    tasks: [
      "Analyzed assigned CVE numbers and validated vulnerabilities in controlled environments.",
      "Created build scripts to reproduce CVE-specific vulnerable setups.",
      "Generated proof.txt files as proof-of-concept for confirmed CVEs.",
      "Documented reproduction and mitigation steps clearly and accurately.",
    ],
  },
  {
    company: "Lifebox Next Gen",
    role: "Developer",
    duration: "3 months",
    logo: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/experiences/lifebox_logo.webp",
    letter: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/experiences/lifebox_letter.pdf",
    color: "#34d399",
    icon: FaTools,
    tags: ["Web Apps", "UX Design", "Unit Testing", "CI/CD"],
    tasks: [
      "Developed features and fixed bugs in web applications.",
      "Collaborated with designers to improve UX and performance.",
      "Wrote unit tests and improved CI workflows.",
    ],
  },
];

function Experience() {
  const [experiences, setExperiences] = useState(DEFAULT_EXPERIENCES);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("display_order", { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped = data.map((item, idx) => ({
            company: item.company,
            role: item.role,
            duration: item.duration,
            logo: item.logo_url || DEFAULT_EXPERIENCES[idx % DEFAULT_EXPERIENCES.length].logo,
            letter: item.letter_url || DEFAULT_EXPERIENCES[idx % DEFAULT_EXPERIENCES.length].letter,
            color: item.color || "#38bdf8",
            icon: FaLaptopCode,
            tags: item.tags || ["Development"],
            tasks: item.tasks || [],
          }));
          setExperiences(mapped);
        }
      } catch (err) {
        console.error("Supabase exp fetch error:", err);
      }
    }

    fetchExperiences();
  }, []);

  // Automatic Calculation of Professional Experience Highlights
  const totalMonths = useMemo(() => {
    let months = 0;
    experiences.forEach((exp) => {
      const dur = String(exp.duration || "").toLowerCase();
      const numMatch = dur.match(/\d+/);
      if (numMatch) {
        const val = parseInt(numMatch[0], 10);
        if (dur.includes("year")) {
          months += val * 12;
        } else {
          months += val;
        }
      }
    });
    return months > 0 ? `${months}+` : "12+";
  }, [experiences]);

  const totalTechDomains = useMemo(() => {
    const set = new Set();
    experiences.forEach((exp) => {
      if (Array.isArray(exp.tags)) {
        exp.tags.forEach((tag) => {
          if (tag && typeof tag === "string") set.add(tag.trim());
        });
      }
    });
    return set.size > 0 ? `${set.size}+` : "5+";
  }, [experiences]);

  const securityRolesCount = useMemo(() => {
    const securityKeywords = ["security", "cve", "cyber", "pentest", "audit", "vulnerability", "content engineer", "soc", "secops", "devsecops"];
    let count = 0;
    experiences.forEach((exp) => {
      const roleStr = String(exp.role || "").toLowerCase();
      const compStr = String(exp.company || "").toLowerCase();
      const tagsStr = Array.isArray(exp.tags) ? exp.tags.join(" ").toLowerCase() : "";
      const fullText = `${roleStr} ${compStr} ${tagsStr}`;

      if (securityKeywords.some((kw) => fullText.includes(kw))) {
        count++;
      }
    });
    return count > 0 ? `${count}` : "2";
  }, [experiences]);

  const highlights = [
    { icon: FaBriefcase, value: `${experiences.length}`, label: "Companies", color: "#38bdf8" },
    { icon: FaClock, value: totalMonths, label: "Months Experience", color: "#818cf8" },
    { icon: FaLaptopCode, value: totalTechDomains, label: "Tech Domains", color: "#34d399" },
    { icon: FaShieldAlt, value: securityRolesCount, label: "Security Roles", color: "#fb923c" },
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

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
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

        {/* Perfectly Aligned Equal-Height Grid Layout for ANY number of items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, i) => {
            const Icon = exp.icon || FaLaptopCode;
            const accentColor = exp.color || "#38bdf8";

            return (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 flex flex-col border border-white/5 relative shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                {/* Glow behind card on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${accentColor}, transparent 80%)` }}
                />

                {/* Top accent bar */}
                <div className="h-1.5 w-full relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
                </div>

                <div className="p-7 flex flex-col flex-1 relative z-10 bg-[#0a0f1e]/90 backdrop-blur-sm">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-6 border-b border-white/5 pb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 border shadow-inner transition-transform duration-500 group-hover:scale-105 bg-white/[0.02] flex-shrink-0"
                        style={{ borderColor: `${accentColor}25` }}
                      >
                        {exp.logo ? (
                          <img src={exp.logo} alt={`${exp.company} Logo`} loading="lazy" decoding="async" width="56" height="56" className="w-full h-full object-contain filter drop-shadow-md" />
                        ) : (
                          <Icon className="text-xl" style={{ color: accentColor }} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-sky-400 transition-colors">{exp.company}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Icon className="text-xs" style={{ color: accentColor }} />
                          <span className="text-xs font-semibold text-slate-400">{exp.role}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm self-start flex-shrink-0"
                      style={{
                        background: `${accentColor}15`,
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                      }}
                    >
                      <FaCalendarAlt className="text-[10px]" /> {exp.duration}
                    </span>
                  </div>

                  {/* Tech Tags */}
                  {exp.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {exp.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tasks / Bullet Points */}
                  {exp.tasks && (
                    <ul className="space-y-3.5 flex-1 mb-6">
                      {exp.tasks.map((task, j) => (
                        <li key={j} className="flex items-start gap-2.5 group/task">
                          <div
                            className="mt-1 flex items-center justify-center w-3.5 h-3.5 rounded-full flex-shrink-0 border transition-colors"
                            style={{ borderColor: `${accentColor}50`, background: `${accentColor}10` }}
                          >
                            <FaRegCheckCircle className="text-[8px] opacity-70 group-hover/task:opacity-100 transition-opacity" style={{ color: accentColor }} />
                          </div>
                          <span className="leading-relaxed text-xs text-slate-300 group-hover/task:text-slate-100 transition-colors">
                            {task}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Card Footer */}
                  <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/10 relative z-10">
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_#34d399] animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified</span>
                    </div>

                    {exp.letter && (
                      <a
                        href={exp.letter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5"
                        style={{
                          background: `${accentColor}15`,
                          color: accentColor,
                          border: `1px solid ${accentColor}30`,
                        }}
                      >
                        <FaFilePdf className="text-xs group-hover/btn:-translate-y-0.5 transition-transform" />
                        View Letter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Experience;
