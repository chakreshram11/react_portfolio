import React, { useEffect, useState } from "react";
import { FaCode, FaServer, FaShieldAlt, FaBug } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const DEFAULT_SKILL_CATEGORIES = [
  {
    title: "Core & Languages",
    icon: FaCode,
    color: "#38bdf8",
    skills: [
      { name: "React JS", level: 85 },
      { name: "HTML", level: 80 },
      { name: "Python", level: 75 },
      { name: "Java", level: 70 },
      { name: "CSS", level: 70 },
      { name: "JavaScript", level: 60 },
    ]
  },
  {
    title: "Backend & Cloud",
    icon: FaServer,
    color: "#818cf8",
    skills: [
      { name: "Python Flask", level: 45 },
      { name: "Firebase", level: 40 },
      { name: "Node JS", level: 40 },
      { name: "Express JS", level: 30 },
    ]
  },
  {
    title: "OS & Environments",
    icon: FaShieldAlt,
    color: "#34d399",
    skills: [
      { name: "Windows", level: 90 },
      { name: "Kali Linux OS", level: 70 },
      { name: "Ubuntu Live Server", level: 70 },
    ]
  }
];

const DEFAULT_RESEARCH = [
  {
    id: 1,
    title: "Information Disclosure",
    date: "Feb 2025",
    description: "Identified improper access control exposing sensitive institutional data. Recommended secure access controls & validation methodologies.",
    color: "#34d399",
  },
  {
    id: 2,
    title: "FTP Misconfiguration",
    date: "Feb 2025",
    description: "Discovered anonymous FTP access exposing confidential files. Suggested robust authentication mechanisms & secure server protocols.",
    color: "#818cf8",
  },
];

function Skills() {
  const [skillCategories, setSkillCategories] = useState(DEFAULT_SKILL_CATEGORIES);
  const [researchItems, setResearchItems] = useState(DEFAULT_RESEARCH);

  useEffect(() => {
    async function fetchSkillsAndResearch() {
      try {
        const { data: sData } = await supabase
          .from("skills")
          .select("*")
          .order("display_order", { ascending: true });

        if (sData && sData.length > 0) {
          const mapped = sData.map((item, idx) => ({
            title: item.category,
            icon: FaCode,
            color: item.color || "#38bdf8",
            skills: item.skill_items || [],
          }));
          setSkillCategories(mapped);
        }

        const { data: rData } = await supabase
          .from("research")
          .select("*")
          .order("display_order", { ascending: true });

        if (rData && rData.length > 0) {
          setResearchItems(rData);
        }
      } catch (err) {
        console.error("Supabase skills/research fetch error:", err);
      }
    }

    fetchSkillsAndResearch();
  }, []);

  return (
    <section id="skills" className="min-h-screen py-20 relative overflow-x-hidden" style={{ background: '#030712' }}>

      {/* Decorative background blurs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">Expertise</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Technical <span className="accent-gradient-text">Skills</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            A comprehensive overview of my technical proficiency, structured across core development, backend infrastructure, and security environments.
          </p>
          <div className="mt-8 w-20 h-1 mx-auto accent-gradient rounded-full opacity-80" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Main Skills Section */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {skillCategories.map((category, idx) => {
              const CategoryIcon = category.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-white/10 transition-all duration-500 relative overflow-hidden group"
                >
                  {/* Subtle category-specific glow inside the card */}
                  <div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                    style={{ background: category.color }}
                  />

                  <div className="flex items-center gap-5 mb-8 border-b border-white/10 pb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner backdrop-blur-md border border-white/5 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
                      style={{
                        background: `${category.color}15`,
                        boxShadow: `inset 0 0 20px ${category.color}10`
                      }}
                    >
                      <CategoryIcon className="text-2xl" style={{ color: category.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-wide">{category.title}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 uppercase tracking-wider font-semibold">Proficiency Level</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="relative">
                        <div className="flex justify-between items-end mb-2.5">
                          <span className="text-sm font-semibold text-slate-300 tracking-wide">
                            {skill.name}
                          </span>
                          <span className="text-xs font-mono font-bold" style={{ color: category.color }}>
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress Bar Container */}
                        <div className="h-2.5 w-full rounded-full bg-[#0a0f1e] overflow-hidden shadow-inner relative border border-white/5">
                          {/* Animated Progress Fill */}
                          <div
                            className="h-full rounded-full relative transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              background: `linear-gradient(90deg, ${category.color}80, ${category.color})`,
                              boxShadow: `0 0 15px ${category.color}60`
                            }}
                          >
                            {/* Shine effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sidebar - Security Research */}
          <aside className="lg:col-span-4 glass-card rounded-2xl p-8 flex flex-col sticky top-24 h-fit border border-emerald-500/20 shadow-[0_0_50px_rgba(52,211,153,0.03)] hover:shadow-[0_0_50px_rgba(52,211,153,0.08)] transition-all duration-500 overflow-hidden group">

            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700" />

            <div className="flex items-center gap-4 mb-8 border-b border-emerald-500/10 pb-5 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/15 border border-emerald-500/20 group-hover:scale-105 transition-transform duration-500">
                <FaBug className="text-xl text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Security Research</h3>
                <p className="text-xs text-emerald-400/80 mt-1 uppercase tracking-wider font-semibold">Recent Discoveries</p>
              </div>
            </div>

            <div className="space-y-8 flex-1 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/40 before:via-indigo-500/20 before:to-transparent z-10">
              {researchItems.map((item, rIdx) => {
                const itemColor = item.color || "#34d399";
                return (
                  <div key={item.id || rIdx} className="relative pl-7">
                    <div
                      className="absolute w-3 h-3 rounded-full border-[3px] border-[#030712] -left-[5.5px] top-1 shadow-md"
                      style={{ background: itemColor, boxShadow: `0 0 15px ${itemColor}` }}
                    />
                    <span className="font-bold text-slate-100 block mb-1 text-sm tracking-wide">
                      {item.title}
                    </span>
                    {item.date && (
                      <span className="text-[10px] uppercase font-bold tracking-widest block mb-2" style={{ color: itemColor }}>
                        {item.date}
                      </span>
                    )}
                    <span className="text-slate-400 text-xs leading-relaxed block">
                      {item.description}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 relative z-10">
              <a
                href="#contact"
                className="group/btn relative w-full flex justify-center items-center gap-3 py-3.5 px-4 rounded-xl text-sm font-bold text-white overflow-hidden transition-all hover:scale-[1.02] shadow-[0_10px_20px_-10px_rgba(52,211,153,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-90 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2 tracking-wide">
                  Contact for Research <FaShieldAlt className="text-base group-hover/btn:rotate-12 transition-transform" />
                </span>
              </a>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

export default Skills;
