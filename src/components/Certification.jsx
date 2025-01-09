import React from "react";
import Robotics from '../assets/robotics.jpg';
import Into_to_Ai from '../assets/intro_to_ai.jpg';
import Excel from '../assets/excel_begin.jpg';
import Cyberawareness from '../assets/cybersecurity_awareness_training.png';

// Sample Certification Data
const certifications = [
  {
    title: "Cyberscurity Awareness Training",
    organization: "KIET ROBOTICS",
    date: "Jun 2023",
    link: "https://drive.google.com/file/d/136QN2fSUXsEGC8VM7tp4KeSHSFYvNAvP/view?usp=sharing",
    image: Robotics, // Placeholder for image
  },
  {
    title: "Introduction to Artificial Intelligence",
    organization: "Great Learning",
    date: "March 2023",
    link: "https://drive.google.com/file/d/1cSlMCJ_wu1zlYih2KyuOYxjOrvHJj-OS/view?usp=drive_link",
    image: Into_to_Ai, // Placeholder for image
  },
  {
    title: "Excel for Beginners",
    organization: "Great Learning",
    date: "July 2023",
    link: "https://drive.google.com/file/d/1V_0rKovCXa-PuPiVVN3NKJaEjcCJUkyV/view?usp=sharing",
    image: Excel, // Placeholder for image
  },
  {
    title: "Cyber Security Awareness",
    organization: "Amazon",
    date: "June 2023",
    link: "https://drive.google.com/file/d/1215ba5RlSbvtd4qJEVuDQ5kgbCznaFAk/view?usp=sharing",
    image: Cyberawareness, // Placeholder for image
  },
];

function Certification() {
  return (
    <section
      id="certifications"
      className="bg-gray-800 text-white py-16 px-6 sm:px-12 lg:px-24"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-8">
          My Certifications
        </h2>
        <p className="text-lg sm:text-xl mb-12">
          Below are the certifications I've earned, showcasing my continuous
          learning and commitment to professional development.
        </p>

        {/* Certification List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Certification Image */}
              <div className="mb-4">
                <img
                  src={cert.image}
                  alt={cert.organization}
                  className="w-full h-32 object-cover rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                />
              </div>

              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {cert.title}
              </h3>
              <p className="text-md text-gray-400 mb-2">
                <strong>Issued by:</strong> {cert.organization}
              </p>
              <p className="text-md text-gray-400 mb-4">
                <strong>Date:</strong> {cert.date}
              </p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-500 text-lg font-semibold"
              >
                View Certificate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certification;
