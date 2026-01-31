import React, { useState } from "react";
// Import certificate images
import CyberSecurityPNG from "../certificates/cybersecurityamazon.png";
import AIcertificatePNG from "../certificates/ai.png";
import ExcelCertificatePNG from "../certificates/excel.png";
import ZscalerPNG from "../certificates/zscaler.png";
import PaloAltoPNG from "../certificates/paloalto.png";
import Fortinet from "../certificates/Fortinet Network security Associate Virtual Internship_page-0001.jpg"
import Nptel from "../certificates/NPTEL-IOT.jpg"
import OS_Basics from "../certificates/OperatingSystemsBasics-cisco_page-0001.jpg"
// import Zero_Trust from "../certificates/zero trust cloud security virtual internship_page-0001.jpg"

// Sample Certification Data
const certifications = [
  {
    title: "Cyber Security Awareness Training",
    organization: "Amazon",
    date: "Nov 2021",
    image: CyberSecurityPNG,
  },
  {
    title: "Introduction to Artificial Intelligence",
    organization: "Great Learning",
    date: "Nov 2021",
    image: AIcertificatePNG,
  },
  {
    title: "Excel for Beginners",
    organization: "Great Learning",
    date: "Nov 2021",
    image: ExcelCertificatePNG,
  },
  {
    title: "Zscaler Networking Virtual Internship",
    organization: "AICTE Platform",
    date: "Dec 2024",
    image: ZscalerPNG,
  },
  {
    title: "Palo Alto Cybersecurity Virtual Internship",
    organization: "AICTE Platform",
    date: "Mar 2025",
    image: PaloAltoPNG,
  },
  {
    title: "Fortinet Network Security Associate",
    organization: "AICTE Platform",
    date: "Aug 2025",
    image: Fortinet, 
  },
  {
    title: "IOT",
    organization: "Swayam NPTEL",
    date: "May 2025",
    image: Nptel,
  },
  {
    title: "Operating System Basics",
    organization: "CISCO",
    date: "Oct 2024",
    image: OS_Basics,
  },
  // {
  //   title: "Zero Trust Cloud Security Virtual Internship",
  //   organization: "AICTE Platform",
  //   date: "Jun 2025",
  //   image: Zero_Trust,
  // },
];

function Certification() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section
      id="certifications"
      className="bg-gray-900 text-white py-16 px-6 sm:px-12 lg:px-24"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-cyan-400 mb-8 tracking-wide">
          My Certifications
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-12">
          Here are some of my certifications showcasing my expertise and continuous learning.
        </p>

        {/* Certification List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {certifications.map((cert, index) => (
            <div
              key={index}
              onClick={() => setSelectedCert(cert)}
              className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 relative border border-gray-700 cursor-pointer transform hover:translate-y-1"
            >
              {/* Display certificate image */}
              <div className="mb-4">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-auto rounded-lg shadow-md border border-cyan-500"
                />
              </div>

              <h3 className="text-xl font-semibold text-cyan-400 mb-2">{cert.title}</h3>
              <p className="text-md text-gray-400 mb-2">
                <strong>Issued by:</strong> {cert.organization}
              </p>
              <p className="text-md text-gray-400 mb-4">
                <strong>Date:</strong> {cert.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for viewing certificate */}
      {selectedCert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-auto">
            {/* Close button (fixed at top-right corner) */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-red-500 transition-all duration-300"
            >
              &times;
            </button>

            {/* Certificate Image (Responsive) */}
            <div className="flex justify-center mb-6">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl border border-cyan-600"
              />
            </div>

            {/* Certificate Details */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-cyan-400">{selectedCert.title}</h3>
              <p className="text-lg text-gray-300">
                <strong>Issued by:</strong> {selectedCert.organization}
              </p>
              <p className="text-lg text-gray-300 mb-4">
                <strong>Date:</strong> {selectedCert.date}
              </p>
              <button
                onClick={() => setSelectedCert(null)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Certification;