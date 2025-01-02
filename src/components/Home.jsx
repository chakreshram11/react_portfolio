import React, { useState, useEffect, useMemo } from "react";
import Photo from "../asserts/photo.png";
import { FaFacebook, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

function Home() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  // Memoized phrases array to avoid unnecessary re-renders
  const phrases = useMemo(
    () => [
      "Frontend Developer",
      "React Enthusiast",
      "Web Designer",
      "Cyber Security Student",
    ],
    []
  );

  useEffect(() => {
    // Typing animation for phrases
    const intervalId = setInterval(() => {
      const currentPhrase = phrases[index];
      setTypedText((prev) => currentPhrase.slice(0, prev.length + 1));

      if (typedText === currentPhrase) {
        // After finishing the current phrase, move to the next one
        setTypedText(""); // Reset typed text for the next phrase
        setIndex((prev) => (prev + 1) % phrases.length); // Loop back to 0 after the last phrase
      }
    }, 150); // Adjust typing speed for phrases

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [typedText, index, phrases]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gray-900 text-center px-4 md:px-8 lg:px-12"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side (Text Content) */}
        <div className="w-full md:w-1/2 text-white md:pr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Hello, It's Me
          </h1>
          <h2>
            <span className="text-cyan-400 text-3xl md:text-4xl lg:text-5xl font-extrabold">
              KUDUPUDI CHAKRESH RAM
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            And I'm a{" "}
            <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-cyan-400 animation typing">
              {typedText} {/* Render the typed phrase */}
            </span>
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-center space-x-6 mt-6">
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
          <div className="flex justify-center md:justify-center space-x-4 mt-6">
            <a
              href="#contact"
              className="bg-cyan-400 hover:bg-cyan-500 text-black px-4 py-2 rounded-md"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Right Side (Image with Hexagon Background) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <div className="relative">
            <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] lg:mr-4 lg:mt-9 bg-cyan-400 rounded-full shadow-glow flex items-center justify-center relative">
              <img
                src={Photo} // Replace `Photo` with the path to your image file
                alt="Chakresh Ram"
                className="w-[295px] h-[295px] md:w-[440px] md:h-[440px] lg:w-[490px] lg:h-[490px] object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
