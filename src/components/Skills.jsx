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
  ];

  return (
    <section id="skills" className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-6xl bg-gray-900 text-green-400 font-mono shadow-lg">
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <span className="ml-auto text-gray-400 text-sm">Skill Set — bash</span>
        </div>

        {/* Terminal Content */}
        <div className="p-6">
          <p className="text-lg">
            <span className="text-cyan-400">guest@cyberworld</span>:<span className="text-yellow-400">~</span>$ ./show_skills.sh
          </p>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <p className="text-gray-300">{skill.name}</p>
                <div className="relative w-full bg-gray-700 h-4 rounded-lg overflow-hidden shadow-md">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-700 ease-in-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-yellow-400 text-sm mt-1">{skill.level}%</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-lg">
            <span className="text-cyan-400">guest@cyberworld</span>:<span className="text-yellow-400">~</span>$ _
          </p>
        </div>
      </div>
    </section>
  );
}

export default Skills;
