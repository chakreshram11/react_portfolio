import React, { useState } from "react";
import CyberSecurityPNG from "../certificates/cybersecurityamazon.webp";
import AIcertificatePNG from "../certificates/ai.webp";
import ExcelCertificatePNG from "../certificates/excel.webp";
import ZscalerPNG from "../certificates/zscaler.webp";
import PaloAltoPNG from "../certificates/paloalto.webp";
import Fortinet from "../certificates/Fortinet Network security Associate Virtual Internship_page-0001.webp"
import Nptel from "../certificates/NPTEL-IOT.webp"
import OS_Basics from "../certificates/OperatingSystemsBasics-cisco_page-0001.webp"
import { FaSearchPlus, FaTimes, FaAward, FaCalendarAlt, FaBuilding } from "react-icons/fa";

const certifications = [
  {
    title: "Cyber Security Awareness Training",
    organization: "Amazon",
    date: "Nov 2021",
    image: CyberSecurityPNG,
    color: "#f59e0b", // Amazon Orange
  },
  {
    title: "Introduction to Artificial Intelligence",
    organization: "Great Learning",
    date: "Nov 2021",
    image: AIcertificatePNG,
    color: "#3b82f6", // Blue
  },
  {
    title: "Excel for Beginners",
    organization: "Great Learning",
    date: "Nov 2021",
    image: ExcelCertificatePNG,
    color: "#10b981", // Green
  },
  {
    title: "Operating System Basics",
    organization: "CISCO",
    date: "Oct 2024",
    image: OS_Basics,
    color: "#06b6d4", // Cisco Cyan
  },
  {
    title: "Zscaler Networking Virtual Internship",
    organization: "AICTE Platform",
    date: "Dec 2024",
    image: ZscalerPNG,
    color: "#38bdf8", // Sky
  },
  {
    title: "Palo Alto Cybersecurity Virtual Internship",
    organization: "AICTE Platform",
    date: "Mar 2025",
    image: PaloAltoPNG,
    color: "#f97316", // Palo Alto Orange
  },
  {
    title: "IOT",
    organization: "Swayam NPTEL",
    date: "May 2025",
    image: Nptel,
    color: "#8b5cf6", // Purple
  },
  {
    title: "Fortinet Network Security Associate",
    organization: "AICTE Platform",
    date: "Aug 2025",
    image: Fortinet,
    color: "#ef4444", // Fortinet Red
  },
];

function Certification() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section
      id="certifications"
      className="py-20 px-6 md:px-14 relative overflow-x-hidden"
      style={{ background: '#030712' }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">Credentials</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            My <span className="accent-gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            A showcase of my continuous learning journey, validating my expertise across cybersecurity, networking, and software development.
          </p>
          <div className="mt-8 w-20 h-1 mx-auto accent-gradient rounded-full opacity-80" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              onClick={() => setSelectedCert(cert)}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 hover:-translate-y-2 border border-white/5 relative flex flex-col shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Dynamic Glow Border Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${cert.color}, transparent 70%)` }}
              />

              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3] bg-dark-950/50 p-4 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-500" />

                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                  className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0a0f1e]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-white text-sm font-bold bg-white/10 px-5 py-2.5 rounded-xl border border-white/20 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <FaSearchPlus className="text-lg" /> View Credential
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1 relative z-30 border-t border-white/5 bg-gradient-to-b from-transparent to-[#030712]/50">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-sky-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-inner"
                    style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                  >
                    <FaAward className="text-sm" style={{ color: cert.color }} />
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <FaBuilding className="text-slate-500" />
                    {cert.organization}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-slate-300">
                    <FaCalendarAlt className="text-slate-500" /> {cert.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal Viewer */}
      {selectedCert && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6 animate-fade-in"
          style={{ background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-[slideUp_0.4s_ease-out_forwards]"
            style={{
              background: 'rgba(10, 15, 30, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${selectedCert.color}20`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
                  style={{ background: `${selectedCert.color}15`, border: `1px solid ${selectedCert.color}30` }}
                >
                  <FaAward className="text-lg" style={{ color: selectedCert.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{selectedCert.title}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: selectedCert.color }}>
                    {selectedCert.organization}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300 group"
              >
                <FaTimes className="text-lg group-hover:scale-110 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 flex-1 overflow-auto flex flex-col items-center justify-center relative">
              {/* Background glow in modal */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${selectedCert.color}, transparent 60%)` }}
              />

              <div className="relative w-full flex justify-center group/img">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl relative z-10 border border-white/5"
                />
              </div>

              <div className="mt-8 flex gap-4 w-full justify-center relative z-10">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-8 py-3 rounded-xl text-sm font-bold text-white border transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: `${selectedCert.color}20`,
                    borderColor: `${selectedCert.color}40`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${selectedCert.color}30`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${selectedCert.color}20`; }}
                >
                  Done Exploring
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Certification;