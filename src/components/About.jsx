import React from "react";

function About() {
  return (
    <section id="about" className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-4xl border border-gray-700 rounded-lg bg-gray-900 text-green-400 font-mono shadow-lg">
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <span className="ml-auto text-gray-400 text-sm">About Me — bash</span>
        </div>

        {/* Terminal Content */}
        <div className="p-6">
          <p className="text-lg">
            <span className="text-cyan-400">guest@cyberworld</span>:<span className="text-yellow-400">~</span>$ whoami
          </p>
          <p className="ml-6 text-gray-300">
            I am a dedicated cybersecurity and full-stack development enthusiast. I completed my diploma in 2023 and have a strong focus on developing secure and scalable applications.
          </p>

          <p className="mt-4 text-lg">
            <span className="text-cyan-400">guest@cyberworld</span>:<span className="text-yellow-400">~</span>$ skills --list
          </p>
          <p className="ml-6 text-gray-300">
            - HTML, CSS, JavaScript, Python, React, Node.js, Express.js, Flask, Kali Linux
            <br />
            - Cybersecurity, Network Security, Ethical Hacking, Cryptography
          </p>

          <p className="mt-4 text-lg">
            <span className="text-cyan-400">guest@cyberworld</span>:<span className="text-yellow-400">~</span>$ cat certifications.txt
          </p>
          <p className="ml-6 text-gray-300">
            - Cyber Security Awareness Training (Amazon)
            <br />
            - Introduction to AI (Great Learning)
            <br />
            - Zscaler Networking Virtual Internship (AICTE)
            <br />
            - Palo Alto Cybersecurity Virtual Internship (AICTE)
          </p>

          <p className="mt-4 text-lg">
            <span className="text-cyan-400">guest@cyberworld</span>:<span className="text-yellow-400">~</span>$ echo "Future Goals"
          </p>
          <p className="ml-6 text-gray-300">
            My short-term goal is to secure a job in cybersecurity. Long-term, I aspire to attain a high-paying position in the field while continuously learning and growing.
          </p>

          <p className="mt-4 text-lg">
            <span className="text-cyan-400">guest@cyberworld</span>:<span className="text-yellow-400">~</span>$ _
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
