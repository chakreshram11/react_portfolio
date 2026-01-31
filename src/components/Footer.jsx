import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";


function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* About Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">Portfolio.</h3>
          <p className="text-sm sm:text-base">
            A portfolio website showcasing my projects, skills, and services. I aim to build impactful, user-friendly web applications.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#home"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#certifications"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Certifications
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold mb-4">Follow Me</h3>
          <div className="flex justify-center sm:justify-start space-x-6 mt-6">
            <a
              href="https://www.facebook.com/chakresh.ram.1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-500 text-3xl transition-transform transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-500 text-3xl transition-transform transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-500 text-3xl transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:chakreshram05@gmail.com"
              className="text-cyan-400 hover:text-cyan-500 text-3xl transition-transform transform hover:scale-110"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-12 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Portfolio. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
