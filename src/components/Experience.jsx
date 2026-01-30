import { FaCalendarAlt, FaFilePdf } from "react-icons/fa";
import manakirana from "../asserts/manakirana.png"
import osmsecLogo from "../asserts/osmsec.png";
import lifeBoxLetter from "../experience/Lifebox.pdf";
import osmsec from "../experience/osmsec.pdf";
import manakiranaletter from "../experience/manakirana.pdf";
import lifeboxlogo from "../asserts/lifebox.png";

function Experience() {
  return (
    <section
      id="experience"
      className="py-16 bg-gray-800 text-white px-4 md:px-14 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl text-cyan-500 sm:text-4xl font-bold">Experience</h2>
          <p className="mt-2 text-white max-w-2xl mx-auto">
            Selected internships and professional experience — letters available
            for download.
          </p>
          <div className="mt-4 w-24 h-1 bg-cyan-500 rounded mx-auto" />
        </div>

        {/* Experience Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Internship 1 */}
          <article className="group bg-gray-900 rounded-lg shadow-xl p-8 border-l-4 border-cyan-500 hover:shadow-2xl transform transition-all hover:-translate-y-1 h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-slate-700/40 text-cyan-400">
                  <img src={manakirana} alt="Manakirana Logo" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-white">
                    Manakirana
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Full Stack Developer
                  </p>
                </div>
              </div>
              <span className="bg-slate-700/30 text-gray-200 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                <FaCalendarAlt /> 3 months
              </span>
            </div>

            <ul className="mt-6 text-sm text-gray-300 space-y-2 list-disc list-inside">
              <li>Built responsive UI components using React and Tailwind CSS.</li>
              <li>
                Implemented RESTful APIs and integrated backend services.
              </li>
              <li>Participated in code reviews and agile sprint planning.</li>
            </ul>

            <div className="mt-8 flex justify-end">
              <a
                href={manakiranaletter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                <FaFilePdf /> View Letter
              </a>
            </div>
          </article>

          {/* Internship 2 */}
          <article className="group bg-gray-900 rounded-lg shadow-xl p-8 border-l-4 border-cyan-500 hover:shadow-2xl transform transition-all hover:-translate-y-1 h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-slate-700/40 text-cyan-400">
                    <img src={osmsecLogo} alt="Osmsec Logo" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-white">Osmsec</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Content Engineer
                  </p>
                </div>
              </div>
              <span className="bg-slate-700/30 text-gray-200 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                <FaCalendarAlt /> 3 months
              </span>
            </div>

            <ul className="mt-6 text-sm text-gray-300 space-y-2 list-disc list-inside">
              <li>
                Analyzed assigned CVE numbers and validated vulnerabilities in
                controlled environments.
              </li>
              <li>
                Created build scripts to reproduce CVE-specific vulnerable
                setups.
              </li>
              <li>
                Generated <code>proof.txt</code> files as proof-of-concept for
                confirmed CVEs.
              </li>
              <li>
                Documented reproduction and mitigation steps clearly and
                accurately.
              </li>
            </ul>

            <div className="mt-8 flex justify-end">
              <a
                href={osmsec}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                <FaFilePdf /> View Letter
              </a>
            </div>
          </article>

          {/* Internship 3 */}
          <article className="group bg-gray-900 rounded-lg shadow-xl p-8 border-l-4 border-cyan-500 hover:shadow-2xl transform transition-all hover:-translate-y-1 h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-slate-700/40 text-cyan-400">
                    <img src={lifeboxlogo} alt="Lifebox Logo" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-white">
                    Lifebox Next Gen
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">Developer</p>
                </div>
              </div>
              <span className="bg-slate-700/30 text-gray-200 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                <FaCalendarAlt /> 3 months
              </span>
            </div>

            <ul className="mt-6 text-sm text-gray-300 space-y-2 list-disc list-inside">
              <li>Developed features and fixed bugs in web applications.</li>
              <li>
                Collaborated with designers to improve UX and performance.
              </li>
              <li>Wrote unit tests and improved CI workflows.</li>
            </ul>

            <div className="mt-8 flex justify-end">
              <a
                href={lifeBoxLetter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                <FaFilePdf /> View Letter
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Experience;
