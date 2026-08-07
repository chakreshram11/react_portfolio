import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  FaPlus, FaTrash, FaEdit, FaSignOutAlt, FaFilePdf, FaImage, FaArrowLeft,
  FaFolder, FaAward, FaBriefcase, FaCode, FaUser, FaCheck, FaTimes, FaCamera
} from "react-icons/fa";

function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");

  // Auth & 2FA State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStep, setAuthStep] = useState("credentials"); // 'credentials' | 'otp_challenge'
  const [otpCode, setOtpCode] = useState("");
  const [verified2FA, setVerified2FA] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Security Credentials Updates
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPin, setNewPin] = useState("");
  const [masterPin, setMasterPin] = useState(() => localStorage.getItem("admin_security_pin") || import.meta.env.VITE_ADMIN_PIN || "123456");

  // Data States
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [research, setResearch] = useState([]);
  const [profile, setProfile] = useState({
    full_name: "KUDUPUDI CHAKRESH RAM",
    tagline: "Passionate about building secure web applications, identifying vulnerabilities, and creating stunning visual content.",
    about_text: "",
    resume_url: "",
    avatar_url: "",
    phrases: ["Full Stack Developer", "Cyber Security Student", "Photoshop Editor", "Security Researcher"],
    facebook_url: "https://www.facebook.com/chakresh.ram.1",
    linkedin_url: "https://www.linkedin.com/in/chakresh-ram-kudupudi-85a6a0256/",
    instagram_url: "https://www.instagram.com/chakreshram/",
    email: "chakreshram11@gmail.com",
  });

  // Modal / Form States
  const [modalType, setModalType] = useState(null); // 'project', 'cert', 'exp', 'skill'
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Check if 2FA was already verified in this browser session
    const isAlreadyVerified = sessionStorage.getItem("admin_2fa_verified") === "true";

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && isAlreadyVerified) {
        setVerified2FA(true);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchAllData();
    }
  }, [session]);

  const fetchAllData = async () => {
    setLoading(true);
    setMsg("");

    // 1. Projects
    const { data: projData } = await supabase.from("projects").select("*").order("display_order", { ascending: true });
    setProjects(projData || []);

    // 2. Certifications
    const { data: certData } = await supabase.from("certifications").select("*").order("display_order", { ascending: true });
    setCertifications(certData || []);

    // 3. Experiences
    const { data: expData } = await supabase.from("experiences").select("*").order("display_order", { ascending: true });
    setExperiences(expData || []);

    // 4. Skills
    const { data: skillData } = await supabase.from("skills").select("*").order("display_order", { ascending: true });
    setSkills(skillData || []);

    // 5. Research
    const { data: resData } = await supabase.from("research").select("*").order("display_order", { ascending: true });
    setResearch(resData || []);

    // 5. Profile
    const { data: profileData } = await supabase.from("profile").select("*").limit(1).single();
    if (profileData) {
      setProfile((prev) => ({
        ...prev,
        ...profileData,
        phrases: Array.isArray(profileData.phrases) ? profileData.phrases : prev.phrases,
      }));
    }

    setLoading(false);
  };

  const handleLoginStep1 = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthLoading(false);
      setMsg(`Login Failed: ${error.message}`);
      return;
    }

    setAuthLoading(false);
    setAuthStep("otp_challenge");
    setMsg("🔐 Step 1 Verified. Please enter your 6-digit Security PIN to access the Admin Panel.");
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim().length < 4) {
      setMsg("Please enter a valid 6-digit Security PIN.");
      return;
    }

    setAuthLoading(true);
    setMsg("");

    // Verify against Admin Security PIN
    const cleanCode = otpCode.trim();
    const metaPin = session?.user?.user_metadata?.security_pin;
    const activePin = localStorage.getItem("admin_security_pin") || metaPin || masterPin || import.meta.env.VITE_ADMIN_PIN;

    if (cleanCode === activePin) {
      sessionStorage.setItem("admin_2fa_verified", "true");
      setVerified2FA(true);
      setAuthLoading(false);
    } else {
      setAuthLoading(false);
      setMsg("❌ Invalid 6-digit Security PIN. Please try again.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return;
    if (newPassword !== confirmPassword) {
      setMsg("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      setMsg("Password must be at least 6 characters long.");
      return;
    }

    setSaving(true);
    setMsg("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);

    if (error) {
      setMsg(`Password Update Failed: ${error.message}`);
    } else {
      setMsg("✅ Password updated successfully in Supabase Auth!");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleUpdatePin = async (e) => {
    e.preventDefault();
    if (!newPin || newPin.trim().length < 4) {
      setMsg("PIN code must be at least 4 digits.");
      return;
    }

    setSaving(true);
    setMsg("");
    const cleanPin = newPin.trim();

    try {
      await supabase.auth.updateUser({
        data: { security_pin: cleanPin },
      });
    } catch (err) {
      console.warn("Metadata update notice:", err);
    }

    localStorage.setItem("admin_security_pin", cleanPin);
    setMasterPin(cleanPin);
    setSaving(false);
    setMsg(`✅ 2FA Security PIN updated successfully to: ${cleanPin}`);
    setNewPin("");
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("admin_2fa_verified");
    setVerified2FA(false);
    setAuthStep("credentials");
    setOtpCode("");
    await supabase.auth.signOut();
  };

  const handleFileUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `uploads/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { data, error } = await supabase.storage.from("portfolio-assets").upload(fileName, file, { upsert: true });

      if (error) {
        alert(`Upload error: ${error.message}`);
      } else {
        const { data: publicData } = supabase.storage.from("portfolio-assets").getPublicUrl(data.path);
        callback(publicData.publicUrl);
      }
    } catch (err) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // --- SAVE HANDLERS ---
  const handleSaveItem = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    let table = "";
    let payload = { ...formData };

    if (modalType === "project") table = "projects";
    if (modalType === "cert") table = "certifications";
    if (modalType === "exp") table = "experiences";
    if (modalType === "skill") table = "skills";
    if (modalType === "research") table = "research";

    // Format tags / tasks / skill_items
    if (typeof payload.tags === "string") {
      payload.tags = payload.tags.split(",").map((s) => s.trim()).filter(Boolean);
    }
    if (typeof payload.tasks === "string") {
      payload.tasks = payload.tasks.split("\n").map((s) => s.trim()).filter(Boolean);
    }

    let error;
    if (editingId) {
      const res = await supabase.from(table).update(payload).eq("id", editingId);
      error = res.error;
    } else {
      const res = await supabase.from(table).insert([payload]);
      error = res.error;
    }

    setSaving(false);
    if (error) {
      setMsg(`Save failed: ${error.message}`);
    } else {
      setModalType(null);
      fetchAllData();
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const payload = {
      ...profile,
      phrases: typeof profile.phrases === "string"
        ? profile.phrases.split(",").map((p) => p.trim()).filter(Boolean)
        : profile.phrases,
    };

    let error;
    if (profile.id) {
      const res = await supabase.from("profile").update(payload).eq("id", profile.id);
      error = res.error;
    } else {
      const res = await supabase.from("profile").insert([payload]);
      error = res.error;
    }

    setSaving(false);
    if (error) setMsg(`Profile Save Failed: ${error.message}`);
    else setMsg("✅ Profile & Resume updated successfully!");
  };

  const handleDeleteItem = async (table, id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      setLoading(true);
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) setMsg(`Delete failed: ${error.message}`);
      else fetchAllData();
    }
  };

  if (loading && !session) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
      </div>
    );
  }

  // --- LOGIN & 2FA SCREEN ---
  if (!session || !verified2FA) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <a href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-sky-400 mb-6 transition-colors">
            <FaArrowLeft /> Back to Live Portfolio
          </a>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest">Two-Factor Authentication</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">
              {authStep === "credentials"
                ? "Step 1 of 2: Enter admin account credentials"
                : "Step 2 of 2: Enter 6-digit Security PIN"}
            </p>
          </div>

          {msg && (
            <div className="mb-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sky-400 text-xs font-semibold leading-relaxed">
              {msg}
            </div>
          )}

          {/* STEP 1: EMAIL & PASSWORD FORM */}
          {authStep === "credentials" && (
            <form onSubmit={handleLoginStep1} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-dark-950 font-extrabold text-sm transition-all shadow-lg shadow-sky-500/20"
              >
                {authLoading ? "Verifying Credentials..." : "Continue to 2FA Verification →"}
              </button>
            </form>
          )}

          {/* STEP 2: 6-DIGIT SECURITY PIN FORM */}
          {authStep === "otp_challenge" && (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  6-Digit Security PIN
                </label>
                <input
                  type="password"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                  maxLength={10}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-center text-xl font-mono tracking-widest text-sky-400 font-bold focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="123456"
                  autoFocus
                />
                <p className="text-[10px] text-slate-500 mt-2 text-center">
                  Enter your 6-digit Master Security PIN to unlock the Admin Panel.
                </p>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/20"
              >
                {authLoading ? "Verifying Security PIN..." : "Verify & Unlock Admin Panel 🔓"}
              </button>

              <div className="flex justify-start items-center pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setAuthStep("credentials")}
                  className="text-slate-400 hover:text-white font-semibold"
                >
                  ← Back to Step 1 Login
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-dark-950 text-slate-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <a href="/" className="text-slate-400 hover:text-sky-400 text-xs font-bold flex items-center gap-1.5 transition-colors">
                <FaArrowLeft /> View Live Website
              </a>
              <span className="text-slate-700">/</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Portfolio Admin Panel</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">Customize Projects, Certifications, Experience, Technical Skills & Profile Photo</p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-xs transition-all"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-slate-800/80 pb-4">
          {[
            { id: "projects", label: "Projects", icon: FaFolder, count: projects.length },
            { id: "certifications", label: "Certifications", icon: FaAward, count: certifications.length },
            { id: "experience", label: "Experience", icon: FaBriefcase, count: experiences.length },
            { id: "skills", label: "Skills", icon: FaCode, count: skills.length },
            { id: "profile", label: "Profile & Photo & Resume", icon: FaUser, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-extrabold transition-all ${
                  active
                    ? "bg-sky-500 text-dark-950 shadow-lg shadow-sky-500/25 scale-[1.02]"
                    : "bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Icon className="text-sm" /> {tab.label} {tab.count !== null && <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/20 font-mono">{tab.count}</span>}
              </button>
            );
          })}
        </div>

        {msg && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-sky-400 font-semibold flex items-center justify-between shadow-lg">
            <span>{msg}</span>
            <button onClick={() => setMsg("")} className="text-slate-500 hover:text-white font-bold text-base px-2">✕</button>
          </div>
        )}

        {/* --- TAB 1: PROJECTS --- */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Projects Portfolio</h2>
                <p className="text-xs text-slate-400">Add web apps, tools, prices, and PDF documentation</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ status: "Completed", paid: false, color: "#38bdf8", display_order: projects.length + 1 });
                  setModalType("project");
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-dark-950 font-bold text-xs shadow-lg shadow-sky-500/20"
              >
                <FaPlus /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((item) => (
                <div key={item.id} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col hover:border-slate-700 transition-all">
                  {item.img_url ? (
                    <img src={item.img_url} alt={item.title} className="w-full h-44 object-cover" />
                  ) : (
                    <div className="h-44 bg-slate-950 flex items-center justify-center text-xs text-slate-600 font-semibold">No Image Uploaded</div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <p className="text-xs text-sky-400 font-semibold mb-2">{item.subtitle}</p>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4">{item.description}</p>
                    <div className="flex gap-2 mt-auto pt-3 border-t border-slate-800/80">
                      <button onClick={() => { setEditingId(item.id); setFormData(item); setModalType("project"); }} className="flex-1 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition-all">Edit</button>
                      <button onClick={() => handleDeleteItem("projects", item.id, item.title)} className="flex-1 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 2: CERTIFICATIONS --- */}
        {activeTab === "certifications" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Certifications & Training</h2>
                <p className="text-xs text-slate-400">Add course certificates and verification credentials</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ color: "#f59e0b", display_order: certifications.length + 1 });
                  setModalType("cert");
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-dark-950 font-bold text-xs shadow-lg shadow-sky-500/20"
              >
                <FaPlus /> Add Certification
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((item) => (
                <div key={item.id} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div>
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-36 object-contain mb-3 rounded-xl bg-slate-950 p-2 border border-slate-800" />
                    ) : (
                      <div className="w-full h-36 bg-slate-950 rounded-xl mb-3 flex items-center justify-center text-xs text-slate-600">No Certificate Image</div>
                    )}
                    <h3 className="font-bold text-white text-base leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">{item.organization} · {item.date}</p>
                  </div>
                  <div className="flex gap-2 mt-5 pt-3 border-t border-slate-800">
                    <button onClick={() => { setEditingId(item.id); setFormData(item); setModalType("cert"); }} className="flex-1 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition-all">Edit</button>
                    <button onClick={() => handleDeleteItem("certifications", item.id, item.title)} className="flex-1 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: EXPERIENCE --- */}
        {activeTab === "experience" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Work Experience</h2>
                <p className="text-xs text-slate-400">Add internships, roles, bullet points and offer letters</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ color: "#38bdf8", display_order: experiences.length + 1 });
                  setModalType("exp");
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-dark-950 font-bold text-xs shadow-lg shadow-sky-500/20"
              >
                <FaPlus /> Add Experience
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiences.map((item) => (
                <div key={item.id} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div>
                    <h3 className="font-bold text-white text-lg">{item.company}</h3>
                    <p className="text-xs text-sky-400 font-semibold mt-0.5">{item.role} ({item.duration})</p>
                    {item.tasks && <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">{Array.isArray(item.tasks) ? item.tasks.join(" ") : item.tasks}</p>}
                  </div>
                  <div className="flex gap-2 mt-5 pt-3 border-t border-slate-800">
                    <button onClick={() => { setEditingId(item.id); setFormData({ ...item, tasks: Array.isArray(item.tasks) ? item.tasks.join("\n") : item.tasks }); setModalType("exp"); }} className="flex-1 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition-all">Edit</button>
                    <button onClick={() => handleDeleteItem("experiences", item.id, item.company)} className="flex-1 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: SKILLS --- */}
        {activeTab === "skills" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Technical Skills & Categories</h2>
                <p className="text-xs text-slate-400">Add or edit skill categories (Core, Backend, OS) and individual skill levels</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    category: "",
                    color: "#38bdf8",
                    skill_items: [
                      { name: "React JS", level: 85 },
                      { name: "Python", level: 75 }
                    ],
                    display_order: skills.length + 1
                  });
                  setModalType("skill");
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-dark-950 font-bold text-xs shadow-lg shadow-sky-500/20"
              >
                <FaPlus /> Add Skill Category
              </button>
            </div>

            {skills.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl">
                <p className="text-slate-400 font-semibold mb-3">No skills category created yet</p>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      category: "Core & Languages",
                      color: "#38bdf8",
                      skill_items: [{ name: "React JS", level: 85 }, { name: "HTML", level: 80 }],
                      display_order: 1
                    });
                    setModalType("skill");
                  }}
                  className="text-xs font-bold text-sky-400 hover:underline"
                >
                  Click here to create your first Skill Category
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((cat) => (
                  <div key={cat.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                        <h3 className="font-bold text-white text-lg flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ background: cat.color || "#38bdf8" }} />
                          {cat.category}
                        </h3>
                        <span className="text-[10px] font-mono font-bold text-slate-500">Order: {cat.display_order ?? 0}</span>
                      </div>

                      <div className="space-y-3 mb-4">
                        {Array.isArray(cat.skill_items) && cat.skill_items.map((sk, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-slate-950 px-3 py-2 rounded-xl border border-slate-800/60 text-xs">
                            <span className="font-semibold text-slate-300">{sk.name}</span>
                            <span className="font-bold text-sky-400">{sk.level}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setFormData(cat);
                          setModalType("skill");
                        }}
                        className="flex-1 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition-all"
                      >
                        Edit Category
                      </button>
                      <button
                        onClick={() => handleDeleteItem("skills", cat.id, cat.category)}
                        className="flex-1 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Security Research Section */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400">🛡️</span> Security Research Discoveries ({research.length})
                  </h2>
                  <p className="text-xs text-slate-400">Add or edit vulnerability research & security discoveries shown in the sidebar</p>
                </div>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      title: "",
                      date: "Feb 2025",
                      description: "",
                      color: "#34d399",
                      display_order: research.length + 1
                    });
                    setModalType("research");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
                >
                  <FaPlus /> Add Security Discovery
                </button>
              </div>

              {research.length === 0 ? (
                <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
                  <p className="text-slate-400 font-semibold mb-2">No security research items added yet</p>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        title: "Information Disclosure",
                        date: "Feb 2025",
                        description: "Identified improper access control exposing sensitive institutional data.",
                        color: "#34d399",
                        display_order: 1
                      });
                      setModalType("research");
                    }}
                    className="text-xs font-bold text-emerald-400 hover:underline"
                  >
                    Click here to add your first Security Discovery
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {research.map((res) => (
                    <div key={res.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-white text-base flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: res.color || "#34d399" }} />
                            {res.title}
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-800">{res.date}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mt-2">{res.description}</p>
                      </div>

                      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setEditingId(res.id);
                            setFormData(res);
                            setModalType("research");
                          }}
                          className="flex-1 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
                        >
                          Edit Discovery
                        </button>
                        <button
                          onClick={() => handleDeleteItem("research", res.id, res.title)}
                          className="flex-1 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 5: PROFILE & PHOTO & RESUME --- */}
        {activeTab === "profile" && (
          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">Profile & Photo Settings</h2>
            <p className="text-xs text-slate-400 mb-8">Update your profile picture, tagline, animated typing phrases, and resume PDF</p>

            <form onSubmit={handleSaveProfile} className="space-y-6">

              {/* Profile Photo Uploader */}
              <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile Avatar" className="w-28 h-28 rounded-full object-cover border-4 border-sky-500/40 shadow-xl" />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center text-slate-600 font-bold">No Photo</div>
                  )}
                  <label className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-xs font-bold gap-1">
                    <FaCamera className="text-lg" />
                    <span>Change</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setProfile({ ...profile, avatar_url: url }))} className="hidden" />
                  </label>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-white text-base mb-1">Profile Photo</h3>
                  <p className="text-xs text-slate-400 mb-3">Upload your portrait photo (JPG, PNG, WebP) to update your homepage photo.</p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition-all">
                    <FaCamera /> Upload Photo
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setProfile({ ...profile, avatar_url: url }))} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={profile.full_name || ""}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="KUDUPUDI CHAKRESH RAM"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Sub-Tagline / Main Bio</label>
                <textarea
                  value={profile.tagline || ""}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="Passionate about building secure web applications..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Animated Typing Phrases (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(profile.phrases) ? profile.phrases.join(", ") : profile.phrases || ""}
                  onChange={(e) => setProfile({ ...profile, phrases: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="Full Stack Developer, Cyber Security Student, Security Researcher"
                />
              </div>

              {/* Resume Uploader */}
              <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
                <h3 className="font-bold text-white text-sm mb-1">Resume PDF Document</h3>
                <p className="text-xs text-slate-400 mb-3">Upload your latest Resume PDF for the "Download CV" button on your homepage.</p>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold transition-colors">
                    <FaFilePdf /> Upload Resume PDF
                    <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, (url) => setProfile({ ...profile, resume_url: url }))} className="hidden" />
                  </label>
                  {profile.resume_url && <span className="text-xs font-bold text-emerald-400">✓ PDF File Attached</span>}
                </div>
              </div>

              {/* Social URLs */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Social Connections</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Facebook URL</label>
                    <input type="text" value={profile.facebook_url || ""} onChange={(e) => setProfile({ ...profile, facebook_url: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">LinkedIn URL</label>
                    <input type="text" value={profile.linkedin_url || ""} onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Instagram URL</label>
                    <input type="text" value={profile.instagram_url || ""} onChange={(e) => setProfile({ ...profile, instagram_url: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
                    <input type="email" value={profile.email || ""} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={saving || uploading} className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-dark-950 font-extrabold text-sm shadow-xl shadow-sky-500/20 transition-all">
                {saving ? "Saving Changes..." : "Save All Profile & Resume Changes"}
              </button>
            </form>

            {/* --- SECURITY & CREDENTIALS MANAGEMENT --- */}
            <div className="mt-12 pt-8 border-t border-slate-800 space-y-8">
              <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-sky-400">🔑</span> Security & Account Credentials
              </h3>

              {/* 1. Change Password */}
              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
                <h4 className="font-bold text-white text-base mb-1">Update Admin Password</h4>
                <p className="text-xs text-slate-400 mb-4">Update your Supabase authentication password for accessing the Admin Portal.</p>

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase tracking-wider">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                        placeholder="New Password (min 6 chars)"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase tracking-wider">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                        placeholder="Re-enter New Password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-dark-950 font-bold text-xs shadow-md transition-all"
                  >
                    {saving ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>

              {/* 2. Change 2FA PIN Code */}
              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
                <h4 className="font-bold text-white text-base mb-1">Update 2FA Security PIN Code</h4>
                <p className="text-xs text-slate-400 mb-4">Set a custom 6-digit Master PIN code required during Step 2 login.</p>

                <form onSubmit={handleUpdatePin} className="flex flex-col sm:flex-row items-end gap-4">
                  <div className="flex-1 w-full">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase tracking-wider">New 2FA Security PIN Code</label>
                    <input
                      type="text"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      required
                      maxLength={10}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-sky-400 font-bold focus:outline-none focus:border-sky-500"
                      placeholder="e.g. 152852 or 654321"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-md transition-all w-full sm:w-auto"
                  >
                    {saving ? "Updating PIN..." : "Update 2FA Security PIN"}
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* --- MODAL FOR ITEMS (Project, Cert, Exp, Skill) --- */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 my-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? "Edit" : "Add"} {modalType.toUpperCase()}
            </h2>

            <form onSubmit={handleSaveItem} className="space-y-4">

              {/* SKILLS MODAL EDITOR */}
              {modalType === "skill" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Category Title *</label>
                    <input
                      type="text"
                      value={formData.category || ""}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      placeholder="e.g. Core & Languages"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Category Color Hex</label>
                    <input
                      type="text"
                      value={formData.color || "#38bdf8"}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      placeholder="#38bdf8"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-slate-300">Skill Items</label>
                      <button
                        type="button"
                        onClick={() => {
                          const existing = Array.isArray(formData.skill_items) ? formData.skill_items : [];
                          setFormData({ ...formData, skill_items: [...existing, { name: "", level: 80 }] });
                        }}
                        className="text-[11px] font-bold text-sky-400 hover:underline"
                      >
                        + Add Skill
                      </button>
                    </div>

                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {Array.isArray(formData.skill_items) && formData.skill_items.map((sk, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                          <input
                            type="text"
                            value={sk.name || ""}
                            onChange={(e) => {
                              const updated = [...formData.skill_items];
                              updated[idx].name = e.target.value;
                              setFormData({ ...formData, skill_items: updated });
                            }}
                            placeholder="Skill Name (e.g. React JS)"
                            className="flex-1 bg-transparent text-xs text-white px-2 py-1 focus:outline-none"
                          />
                          <input
                            type="number"
                            value={sk.level ?? 80}
                            onChange={(e) => {
                              const updated = [...formData.skill_items];
                              updated[idx].level = parseInt(e.target.value, 10) || 0;
                              setFormData({ ...formData, skill_items: updated });
                            }}
                            placeholder="%"
                            className="w-16 bg-slate-900 text-xs text-sky-400 font-bold px-2 py-1 rounded text-center"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.skill_items.filter((_, i) => i !== idx);
                              setFormData({ ...formData, skill_items: updated });
                            }}
                            className="text-red-400 p-1 hover:text-red-300"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* PROJECT MODAL EDITOR */}
              {modalType === "project" && (
                <>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Title *</label><input type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Subtitle</label><input type="text" value={formData.subtitle || ""} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Description</label><textarea value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Cover Image</label><input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, img_url: url }))} className="text-xs text-slate-400" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Documentation PDF</label><input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, doc_url: url }))} className="text-xs text-slate-400" /></div>
                </>
              )}

              {/* CERTIFICATION MODAL EDITOR */}
              {modalType === "cert" && (
                <>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Title *</label><input type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Organization</label><input type="text" value={formData.organization || ""} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Date</label><input type="text" value={formData.date || ""} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="Nov 2024" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Certificate Image</label><input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, image_url: url }))} className="text-xs text-slate-400" /></div>
                </>
              )}

              {/* EXPERIENCE MODAL EDITOR */}
              {modalType === "exp" && (
                <>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Company Name *</label><input type="text" value={formData.company || ""} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Role</label><input type="text" value={formData.role || ""} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Duration</label><input type="text" value={formData.duration || ""} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="6 months" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Tasks (one per line)</label><textarea value={formData.tasks || ""} onChange={(e) => setFormData({ ...formData, tasks: e.target.value })} rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Experience Letter PDF</label><input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, letter_url: url }))} className="text-xs text-slate-400" /></div>
                </>
              )}

              {/* RESEARCH MODAL EDITOR */}
              {modalType === "research" && (
                <>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Vulnerability / Discovery Title *</label><input type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="e.g. Information Disclosure" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Date Tag</label><input type="text" value={formData.date || ""} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Feb 2025" /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Description & Impact</label><textarea value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Detailed vulnerability summary..." /></div>
                  <div><label className="block text-xs font-bold text-slate-300 mb-1">Color Hex</label><input type="text" value={formData.color || "#34d399"} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="#34d399" /></div>
                </>
              )}

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setModalType(null)} className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs">Cancel</button>
                <button type="submit" disabled={saving || uploading} className="flex-1 py-3 rounded-xl bg-sky-500 text-dark-950 font-bold text-xs">{saving ? "Saving..." : "Save Item"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Admin;
