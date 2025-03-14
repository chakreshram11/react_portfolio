import React from "react";

// Import PDFs from the local folder
import CyberSecurityPDF from "../certificates/cybersecurityamazon.pdf";
import AIcertificatePDF from "../certificates/ai.pdf";
import ExcelCertificatePDF from "../certificates/excel.pdf";
import ZscalerPDF from "../certificates/zscaler.pdf";
import PaloAltoPDF from "../certificates/paloalto.pdf";

// Sample Certification Data
const certifications = [
  {
    title: "Cyber Security Awareness Training",
    organization: "Amazon",
    date: "Nov 2021",
    link: CyberSecurityPDF,
  },
  {
    title: "Introduction to Artificial Intelligence",
    organization: "Great Learning",
    date: "Nov 2021",
    link: AIcertificatePDF,
  },
  {
    title: "Excel for Beginners",
    organization: "Great Learning",
    date: "Nov 2021",
    link: ExcelCertificatePDF,
  },
  {
    title: "Zscaler Networking Virtual Internship",
    organization: "AICTE Platform",
    date: "Dec 2024",
    link: ZscalerPDF,
  },
  {
    title: "Palo Alto Cybersecurity Virtual Internship",
    organization: "AICTE Platform",
    date: "Mar 2025",
    link: PaloAltoPDF,
  },
];

function Certification() {
  return (
    <section
      id="certifications"
      className="bg-gray-800 text-white py-16 px-6 sm:px-12 lg:px-24"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-cyan-400 mb-8 tracking-wide">
          My Certifications
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-12">
          Here are some of my certifications showcasing my expertise and
          continuous learning.
        </p>

        {/* Certification List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 relative border border-gray-700"
            >
              {/* Embedded PDF Viewer */}
              <div className="mb-4">
                <iframe
                  src={cert.link}
                  className="w-full h-56 rounded-lg shadow-md border border-cyan-500"
                  title={cert.title}
                ></iframe>
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
                className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-semibold text-md transition-all duration-300 inline-block"
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
