import React, { useState, useEffect, useMemo } from "react";
import Photo from "../asserts/photo.png";
import { FaFacebook, FaLinkedin, FaInstagram, FaEnvelope, FaFilePdf } from "react-icons/fa";
import resume from "../projects/single page resume.pdf";

function Home() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  // Memoized phrases array to avoid unnecessary re-renders
  const phrases = useMemo(
    () => [
      "Full Stack Developer",
      "Cyber Security Student",
      "Adobe Photoshop Editor",
      "Cyber Security Enthusiast",
    ],
    []
  );

  useEffect(() => {
    // Typing animation for phrases
    const intervalId = setInterval(() => {
      const currentPhrase = phrases[index];
      setTypedText((prev) => currentPhrase.slice(0, prev.length + 1));

      if (typedText === currentPhrase) {
        setTypedText(""); // Reset typed text for the next phrase
        setIndex((prev) => (prev + 1) % phrases.length); // Loop back to 0 after the last phrase
      }
    }, 150); // Adjust typing speed for phrases

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [typedText, index, phrases]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gray-800 text-center px-4 md:px-14 lg:px-16"
    >
      {/* Responsive container: Image on top in mobile, side-by-side in desktop */}
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        
        {/* Left Side (Text Content) */}
        <div className="w-full md:w-1/2 text-white text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Hello, It's Me
          </h1>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-cyan-400">
            KUDUPUDI CHAKRESH RAM
          </h2>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            And I'm a{" "}
            <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-cyan-400">
              {typedText}
            </span>
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start space-x-6 mt-6">
            <a
              href="https://www.facebook.com/chakresh.ram.1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-500 text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/chakresh-ram-kudupudi-85a6a0256/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-500 text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/chakreshram/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-500 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:chakreshram11@gmail.com"
              className="text-cyan-400 hover:text-cyan-500 text-2xl"
            >
              <FaEnvelope />
            </a>
          </div>

          {/* Download CV Button */}
          <div className="flex justify-center md:justify-start mt-6">
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-black px-6 py-2 rounded-md font-semibold text-lg"
            >
              <FaFilePdf className="text-lg" />
              Download CV
            </a>
          </div>
        </div>

        {/* Right Side (Image with Hexagon Background) */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] bg-cyan-400 rounded-full shadow-glow flex items-center justify-center">
              <img
                src={Photo}
                alt="Chakresh Ram"
                className="w-[97%] h-[97%] object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
