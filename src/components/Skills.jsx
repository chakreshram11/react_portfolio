import React from "react";

function Skills() {
  const skills = [
    { name: "HTML", level: 80 },
    { name: "CSS", level: 70 },
    { name: "Java", level: 70 },
    { name: "JavaScript", level: 60 },
    { name: "Python", level: 75 },
    { name: "React JS", level: 85 },
    { name: "Node JS", level: 40 },
    { name: "Express JS", level: 30 },
    { name: "Python Flask", level: 45 },
    { name: "Kali Linux OS", level: 70 },
    { name: "Windows", level: 90 },
    { name: "Ubuntu Live Server", level: 70 },
    { name: "Firebase", level: 40 },
  ];

  return (
    <section id="skills" className="min-h-screen bg-gradient-to-b bg-gray-900 via-[#071019] to-[#0d1220] py-20 text-slate-200">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-cyan-400">Skills</h2>
          <p className="text-slate-400 mt-2">Security-focused skillset — frontend, backend & platforms.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#061122] rounded-xl p-6 shadow-lg border border-cyan-900/10">
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className="bg-gradient-to-r from-[#061422] to-[#08182a] p-4 rounded-lg border border-cyan-900/20 hover:shadow-[0_10px_30px_rgba(8,145,178,0.08)] transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-200">{skill.name}</p>
                    </div>
                    <div className="text-sm text-slate-400">{skill.level}%</div>
                  </div>

                  <div className="mt-3 h-3 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${skill.level}%`, background: 'linear-gradient(90deg,#06b6d4,#7c3aed)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-[#061122] rounded-xl p-6 shadow-lg border border-indigo-900/20">
            <h4 className="text-cyan-300 font-semibold">Security Highlights</h4>
            <ul className="mt-4 space-y-3 text-slate-400 text-sm">
              <li>Certifications: OSCP, CEH (placeholder)</li>
              <li>Experience with red team assessments & hardened infrastructure</li>
              <li>Strong fundamentals in network protocols, cryptography, and incident response</li>
            </ul>
            <div className="mt-6">
              <a href="#contact" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">Hire Me for Security Work</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Skills;
