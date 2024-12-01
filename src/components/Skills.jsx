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
    { name: "Kali Linux OS", level: 70}
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-cyan-400">Skill Set</h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div key={skill.name} className="mb-4">
              <h3 className="text-lg text-white">{skill.name}</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="relative mb-2">
                  <div
                    className="flex-1 bg-gray-200 rounded-full h-2"
                    style={{ width: "100%" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 h-2 bg-cyan-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
