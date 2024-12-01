import React from "react";

function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-cyan-400 text-center">Latest Projects</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {Array(6).fill().map((_, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <img
                src={`/path/to/project${idx + 1}.jpg`} // Replace with actual paths
                alt={`Project ${idx + 1}`}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
