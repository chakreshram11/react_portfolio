import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Certification from "./components/Certification";
import Experience from "./components/Experience";

function App() {
  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <Home />
      <About />
      <Skills />
      <Certification />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
