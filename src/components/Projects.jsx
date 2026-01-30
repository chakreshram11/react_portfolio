import tensilePdf from "../projects/Tensile.pdf";
import tensileImg from "../asserts/tensiles.png";
import wordlist from "../projects/Custom Wordlist Generator.pdf";
import wordlistImg from "../asserts/wordlist.png";
import cybercrewPdf from "../projects/Cyber Crew.pdf";
import cybercrew from "../asserts/cybercrew.png";

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Tensile – Web Platform & Firebase Admin Dashboard",
      img: tensileImg, // replace with real image path in public or src
      doc: tensilePdf, // imported PDF from src/projects/Tensile.pdf
    },

    {
      id: 2,
      title: "Custom Wordlist Generator (Python)",
      img: wordlistImg,
      doc: wordlist,
    },
    {
      id: 3,
      title: "Project Three",
      img: cybercrew,
      doc: cybercrewPdf,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-cyan-400 text-center">Latest Projects</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col">
              <img
                src={project.img}
                alt={project.title}
                className="rounded-lg mb-4 object-cover h-48 w-full"
              />

              <h3 className="text-xl text-white font-semibold mb-2">{project.title}</h3>

              <div className="mt-auto flex space-x-2">
                {project.doc ? (
                  <>
                    <a
                      href={project.doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-md text-sm"
                    >
                      View Documentation
                    </a>

                    <a
                      href={project.doc}
                      download
                      className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Download PDF
                    </a>
                  </>
                ) : (
                  <span className="text-gray-400">Documentation not available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
