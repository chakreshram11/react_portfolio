import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Admin from "./components/Admin";

// Lazy load components below the fold for better initial load performance (FCP/TBT)
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Certification = lazy(() => import("./components/Certification"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Simple loading skeleton to prevent CLS
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center bg-dark-950">
    <div className="w-10 h-10 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
  </div>
);

function MainPortfolio() {
  return (
    <div className="bg-dark-950 text-slate-200 antialiased">
      <Header />
      <Home />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certification />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
