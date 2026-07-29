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
    <div className="bg-dark-950 text-slate-200 antialiased">
      <Header />
      <Home />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certification />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
