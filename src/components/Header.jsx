import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll to the target section
  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    setIsOpen(false); // Close the menu on mobile after clicking a link
    const section = document.querySelector(target);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-50 backdrop-blur-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="text-white hover:text-cyan-400"
          >
            Portfolio<span className="text-cyan-400">.</span>
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          aria-label="Toggle navigation"
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-y-4 md:space-y-0 md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-500 ease-in-out p-4 md:p-0 ${
            isOpen ? "slide-in" : "slide-out"
          }`}
        >
          <ul className="flex flex-col md:flex-row text-white text-center md:space-x-6">
            {["home", "about", "skills", "certifications", "projects", "contact"].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => handleSmoothScroll(e, `#${section}`)}
                  className="hover:text-cyan-400 transition-colors duration-300"
                >
                  {capitalizeFirstLetter(section)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Slide-in and Slide-out Animation Styles */}
      <style jsx="true" >{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .slide-in {
          animation: slideIn 0.3s ease-in-out forwards;
        }

        .slide-out {
          animation: slideOut 0.3s ease-in-out forwards;
        }

        /* Remove animation for desktop mode */
        @media (min-width: 768px) {
          .slide-in, .slide-out {
            animation: none;
          }
        }
      `}</style>
    </header>
  );

  // Capitalize the first letter of each section (e.g., home -> Home)
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export default Header;
