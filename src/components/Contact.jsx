import React from "react";
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="py-20 px-6 md:px-14 relative overflow-x-hidden" style={{ background: '#030712' }}>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-1/3 -left-32 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">Get in Touch</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Let's Work <span className="accent-gradient-text">Together</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            Whether you have a question, a project idea, or just want to connect, feel free to drop a message. I'm always open to discussing new opportunities.
          </p>
          <div className="mt-8 w-20 h-1 mx-auto accent-gradient rounded-full opacity-80" />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            <div className="glass-card rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-sky-500/20 transition-all duration-700" />

              <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">Contact Information</h3>

              <div className="space-y-6">
                <a href="mailto:chakreshram11@gmail.com" className="flex items-start gap-4 group/item">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-inner group-hover/item:scale-110 group-hover/item:border-sky-500/30 group-hover/item:bg-sky-500/10 transition-all duration-300">
                    <FaEnvelope className="text-lg text-slate-400 group-hover/item:text-sky-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm font-medium text-slate-300 group-hover/item:text-white transition-colors">chakreshram11@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 group/item">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-inner group-hover/item:scale-110 group-hover/item:border-emerald-500/30 group-hover/item:bg-emerald-500/10 transition-all duration-300">
                    <FaMapMarkerAlt className="text-lg text-slate-400 group-hover/item:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-sm font-medium text-slate-300 group-hover/item:text-white transition-colors">Available for Remote & Relocation</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Social Profiles</p>
                <div className="flex gap-4">
                  {[
                    { name: "GitHub", icon: FaGithub, href: "https://github.com/chakreshram11", color: "hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-500/50" },
                    { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/chakresh-ram-kudupudi-85a6a0256/", color: "hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/50" },
                    { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/chakreshram/", color: "hover:bg-[#E1306C]/20 hover:text-[#E1306C] hover:border-[#E1306C]/50" },
                    { name: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/chakresh.ram.1", color: "hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/50" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 shadow-inner transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                    >
                      <social.icon className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 sm:p-10 border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-700" />

              <h3 className="text-2xl font-bold text-white mb-8 tracking-wide">Send a Message</h3>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
              >
                <input type="hidden" name="access_key" value="c58c2668-e2ff-4598-a489-1cb3e4770d55" />

                <div className="md:col-span-1 group/input relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name" aria-label="Full Name"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-[#0a0f1e]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-[#0a0f1e] focus:ring-1 focus:ring-sky-500/50 transition-all duration-300 text-sm shadow-inner"
                  />
                </div>

                <div className="md:col-span-1 group/input relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address" aria-label="Email Address"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-[#0a0f1e]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-[#0a0f1e] focus:ring-1 focus:ring-sky-500/50 transition-all duration-300 text-sm shadow-inner"
                  />
                </div>

                <div className="md:col-span-1 group/input relative">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Mobile Number" aria-label="Mobile Number"
                    className="w-full px-5 py-4 rounded-xl bg-[#0a0f1e]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-[#0a0f1e] focus:ring-1 focus:ring-sky-500/50 transition-all duration-300 text-sm shadow-inner"
                  />
                </div>

                <div className="md:col-span-1 group/input relative">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject" aria-label="Subject"
                    className="w-full px-5 py-4 rounded-xl bg-[#0a0f1e]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-[#0a0f1e] focus:ring-1 focus:ring-sky-500/50 transition-all duration-300 text-sm shadow-inner"
                  />
                </div>

                <div className="md:col-span-2 group/input relative">
                  <textarea
                    name="message"
                    placeholder="Your Message" aria-label="Your Message"
                    rows="5"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-[#0a0f1e]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-[#0a0f1e] focus:ring-1 focus:ring-sky-500/50 transition-all duration-300 text-sm resize-none shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="md:col-span-2 group/btn relative inline-flex items-center justify-center gap-3 w-full py-4 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:-translate-y-0.5 mt-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                  <span className="relative z-10 flex items-center gap-2 tracking-wider">
                    Send Message
                    <FaPaperPlane className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 group-hover/btn:scale-110 transition-transform duration-300" />
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;