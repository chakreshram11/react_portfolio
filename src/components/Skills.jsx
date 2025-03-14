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
    { name: "Windos", level: 80 },
    { name: "Ubuntu Live Server", level: 70 },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900 text-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-12">Skill Set</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="bg-gray-800 p-5 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
              <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-all duration-500 ease-in-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-cyan-400 mt-2 inline-block">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;