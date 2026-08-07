import React, { useEffect, useState } from "react";
import { FaDownload, FaPython, FaReact, FaShieldAlt, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Tensile",
    subtitle: "Web Platform & Firebase Admin Dashboard",
    description: "A full-featured web platform with an integrated Firebase admin dashboard for managing content, users, and real-time data.",
    img: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/projects/tensile.webp",
    doc: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/projects/tensile_doc.pdf",
    color: "#38bdf8",
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
    img: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/projects/wordlist.webp",
    doc: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/projects/wordlist_doc.pdf",
    color: "#34d399",
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
    img: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/projects/cybercrew.webp",
    doc: "https://uyemhrhwuyrqwvppluge.supabase.co/storage/v1/object/public/portfolio-assets/projects/cybercrew_doc.pdf",
    color: "#818cf8",
    icon: FaShieldAlt,
    tags: ["Web Dev", "UI/UX", "Community", "Security"],
    status: "Completed",
    paid: false,
  },
];

function Projects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    async function fetchSupabaseProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("display_order", { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped = data.map((item, idx) => ({
            id: item.id || idx + 1,
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            img: item.img_url || DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length].img,
            doc: item.doc_url || DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length].doc,
            color: item.color || "#38bdf8",
            icon: FaCode,
            tags: item.tags || ["Project"],
            status: item.status || "Completed",
            paid: item.paid || false,
            price: item.price || "",
          }));
          setProjects(mapped);
        }
      } catch (e) {
        console.error("Supabase fetch projects error:", e);
      }
    }

    fetchSupabaseProjects();
  }, []);

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
            Featured <span className="accent-gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            A curated selection of my finest work — spanning full-stack web platforms, custom security tools, and community applications.
          </p>
          <div className="mt-8 w-20 h-1 mx-auto accent-gradient rounded-full opacity-80" />
        </div>

        {/* Balanced Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const ProjectIcon = project.icon || FaCode;
            const accentColor = project.color || "#38bdf8";

            return (
              <div
                key={project.id || index}
                className="glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 flex flex-col border border-white/5 relative shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                {/* Glow behind card on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top, ${accentColor}, transparent 70%)` }}
                />

                {/* Accent Top Bar */}
                <div className="h-1.5 w-full relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
                </div>

                {/* Cover Image Container */}
                <div className="relative overflow-hidden w-full h-52 bg-slate-950/80">
                  <div className="absolute inset-0 bg-dark-950/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="240"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/40 to-transparent z-10" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 z-20">
                    {project.paid ? (
                      <span className="text-[9px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-md uppercase tracking-wider">
                        Paid · {project.price}
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-md uppercase tracking-wider">
                        Unpaid
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 z-20">
                    <span className="text-[9px] px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-md font-bold uppercase tracking-wider">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1 relative z-20 bg-[#0a0f1e]/90 backdrop-blur-sm">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border backdrop-blur-md transition-transform duration-500 group-hover:scale-110 flex-shrink-0"
                      style={{ background: `${accentColor}15`, borderColor: `${accentColor}30` }}
                    >
                      <ProjectIcon className="text-lg" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide leading-snug group-hover:text-sky-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: accentColor }}>
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                      {project.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 border-t border-white/10 pt-5 mt-auto">
                    {project.doc && (
                      <a
                        href={project.doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 flex-1 shadow-md hover:-translate-y-0.5"
                        style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}
                      >
                        <FaExternalLinkAlt className="group-hover/btn:-mt-0.5 group-hover/btn:translate-x-0.5 transition-transform" /> View Docs
                      </a>
                    )}
                    {project.doc && (
                      <a
                        href={project.doc}
                        download
                        className="group/dl inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white/[0.03] border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 shadow-md hover:-translate-y-0.5"
                      >
                        <FaDownload className="group-hover/dl:translate-y-0.5 transition-transform" />
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

export default Projects;
