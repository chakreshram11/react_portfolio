import React from "react";
import tensilePdf from "../projects/Tensile.pdf";
import tensileImg from "../asserts/tensiles.webp";
import wordlist from "../projects/Custom Wordlist Generator.pdf";
import wordlistImg from "../asserts/wordlist.webp";
import cybercrewPdf from "../projects/Cyber Crew.pdf";
import cybercrew from "../asserts/cybercrew.webp";
import { FaDownload, FaFolderOpen, FaFire, FaPython, FaReact, FaShieldAlt, FaExternalLinkAlt } from "react-icons/fa";

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Tensile",
      subtitle: "Web Platform & Firebase Admin Dashboard",
      description: "A full-featured web platform with an integrated Firebase admin dashboard for managing content, users, and real-time data.",
      img: tensileImg,
      doc: tensilePdf,
      color: "#38bdf8", // Sky blue
      icon: FaReact,
      tags: ["React", "Firebase", "Admin Panel", "Real-time"],
      status: "Completed",
      paid: true,
      price: "8000 Rs",
    },
    {
      id: 2,
      title: "Custom Wordlist Generator",
      subtitle: "Python Security Tool",
      description: "A Python-based tool that generates custom wordlists for security testing and penetration testing workflows.",
      img: wordlistImg,
      doc: wordlist,
      color: "#34d399", // Emerald
      icon: FaPython,
      tags: ["Python", "Security", "CLI", "Automation"],
      status: "Completed",
      paid: false,
    },
    {
      id: 3,
      title: "Cyber Crew",
      subtitle: "Cybersecurity Club Website",
      description: "An interactive website for a cybersecurity club, featuring events, resources, and member management.",
      img: cybercrew,
      doc: cybercrewPdf,
      color: "#818cf8", // Indigo
      icon: FaShieldAlt,
      tags: ["Web Dev", "UI/UX", "Community", "Security"],
      status: "Completed",
      paid: false,
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 md:px-14 relative overflow-x-hidden" style={{ background: '#030712' }}>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">Portfolio</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Latest <span className="accent-gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            A curated selection of my finest work — spanning full-stack web platforms, custom security tools, and community applications.
          </p>
          <div className="mt-8 w-20 h-1 mx-auto accent-gradient rounded-full opacity-80" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

          {/* Featured Project - Large Card */}
          {(() => {
            const featured = projects[0];
            const FeaturedIcon = featured.icon;
            return (
              <div className="md:col-span-7 glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-1.5 flex flex-col border border-white/5 relative shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(56,189,248,0.1)]">

                {/* Glow behind card on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top, ${featured.color}, transparent 60%)` }}
                />

                <div className="relative overflow-hidden w-full h-64 md:h-80">
                  <div className="absolute inset-0 bg-dark-950/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={featured.img}
                    alt={featured.title}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/40 to-transparent z-10" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-20">
                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg backdrop-blur-md shadow-lg flex items-center gap-1.5 uppercase tracking-wider"
                      style={{ background: `${featured.color}25`, color: featured.color, border: `1px solid ${featured.color}40` }}
                    >
                      <FaFire className="animate-pulse" /> Featured
                    </span>
                    {featured.paid ? (
                      <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg backdrop-blur-md bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-lg uppercase tracking-wider">
                        Paid Project · {featured.price}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg backdrop-blur-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg uppercase tracking-wider">
                        Unpaid Project
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-[10px] px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-lg font-bold uppercase tracking-wider">
                      {featured.status}
                    </span>
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col flex-1 relative z-20 -mt-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                      style={{ background: `${featured.color}15`, borderColor: `${featured.color}30` }}
                    >
                      <FeaturedIcon className="text-xl" style={{ color: featured.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-wide">{featured.title}</h3>
                      <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mt-1">{featured.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{featured.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {featured.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 border-t border-white/10 pt-6">
                    <a
                      href={featured.doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 flex-1 justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      style={{ background: `${featured.color}15`, color: featured.color, border: `1px solid ${featured.color}30` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                      <FaExternalLinkAlt className="group-hover/btn:-mt-1 group-hover/btn:translate-x-0.5 transition-transform" /> View Docs
                    </a>
                    <a
                      href={featured.doc}
                      download
                      className="group/dl inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-white/[0.03] border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                    >
                      <FaDownload className="group-hover/dl:translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Right Column - 2 Stacked Cards */}
          <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">
            {projects.slice(1).map((project) => {
              const ProjectIcon = project.icon;
              return (
              <div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-1 flex-1 flex flex-col border border-white/5 relative shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(255,255,255,0.03)]"
              >
                <div className="h-1.5 w-full relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
                </div>

                <div className="flex flex-col sm:flex-row flex-1 relative z-10">
                  <div className="sm:w-2/5 relative overflow-hidden h-40 sm:h-auto">
                    <div className="absolute inset-0 bg-dark-950/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="250"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0f1e]/80 hidden sm:block z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 to-transparent block sm:hidden z-10" />

                    {/* Tags on Image */}
                    <div className="absolute top-2 left-2 z-20 flex flex-col gap-2">
                      {project.paid ? (
                        <span className="text-[8px] font-bold px-2 py-1 rounded-md backdrop-blur-md bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-md uppercase tracking-wider">
                          Paid · {project.price}
                        </span>
                      ) : (
                        <span className="text-[8px] font-bold px-2 py-1 rounded-md backdrop-blur-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-md uppercase tracking-wider">
                          Unpaid
                        </span>
                      )}
                      <span className="text-[8px] font-bold px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-md uppercase tracking-wider w-fit">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="sm:w-3/5 p-6 flex flex-col z-20 bg-[#0a0f1e] sm:bg-transparent">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-inner transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${project.color}15`, borderColor: `${project.color}30` }}
                      >
                        <ProjectIcon className="text-sm" style={{ color: project.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base tracking-wide leading-tight">{project.title}</h3>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2" style={{ color: project.color }}>{project.subtitle}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                      {project.tags.slice(0, 3).map((tag, j) => (
                        <span
                          key={j}
                          className="text-[9px] font-semibold px-2 py-1 rounded-md text-slate-400 bg-white/[0.03] border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/sbtn inline-flex items-center gap-1.5 text-[10px] font-bold px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:-translate-y-0.5"
                        style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}25` }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = `${project.color}20`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = `${project.color}10`; }}
                      >
                        <FaExternalLinkAlt className="group-hover/sbtn:-mt-0.5 group-hover/sbtn:translate-x-0.5 transition-transform" /> Docs
                      </a>
                      <a
                        href={project.doc}
                        download
                        className="group/sdl inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-bold bg-white/[0.03] border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 shadow-md hover:-translate-y-0.5"
                      >
                        <FaDownload className="group-hover/sdl:translate-y-0.5 transition-transform" /> PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Bottom Summary Bar */}
          <div className="md:col-span-12 glass-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-500 mt-2">

            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-sky-500/10 transition-all duration-700" />

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center accent-gradient shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500">
                <FaFolderOpen className="text-dark-950 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-wide">More projects coming soon</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">Currently working on new security tools and web applications</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-6 relative z-10">
              {[
                { label: "Web Platforms", count: "1", color: "#38bdf8" },
                { label: "Security Tools", count: "1", color: "#34d399" },
                { label: "Community Sites", count: "1", color: "#818cf8" },
              ].map((cat, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.02] px-4 py-2 rounded-xl border border-white/5 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}` }} />
                  <span className="text-xs font-semibold text-slate-300">{cat.label}</span>
                  <span className="text-sm font-black" style={{ color: cat.color }}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Projects;