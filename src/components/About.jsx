// import React from "react";

// function About() {
//   return (
//     <section id="about" className="py-20 bg-gray-800 text-center">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-cyan-400">About Me</h2>
//         <p className="mt-4 text-lg">
//           I am a dedicated student currently pursuing studies in Cybersecurity, with a growing 
//           expertise in Full Stack Development. My passion lies in developing secure, efficient, 
//           and scalable web applications, and I continuously seek to enhance my skills in both 
//           frontend and backend technologies. In addition to my technical abilities, I have a 
//           strong interest in photo editing, which helps me combine creativity with precision in 
//           both design and technical problem-solving. 
//         </p>
//         <p className="mt-4 text-lg">
//           My academic journey, coupled with hands-on projects, has provided me with a solid 
//           foundation to contribute effectively to diverse projects. I am committed to continuous 
//           growth in my field and am excited about exploring opportunities where I can apply my 
//           knowledge and skills while learning from industry professionals.
//         </p>
//       </div>
//     </section>
//   );
// }

// export default About;

import React from "react";

function About() {
  return (
    <section id="about" className="py-20 bg-gray-800 text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-6">About Me</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          I am a dedicated and passionate individual who completed my diploma in 2023, with a strong focus on
          Cybersecurity and Full Stack Development. My technical expertise includes proficiency in languages
          and frameworks such as HTML, CSS, Java, JavaScript, Python, React JS, Node JS, Express JS, Python Flask,
          and Kali Linux OS. I continuously strive to enhance my skills in developing secure, efficient, and scalable applications.
        </p>
        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
          I have successfully completed a three-month internship in Full Stack Development, equipping me with hands-on
          experience in both frontend and backend technologies. Additionally, I have earned certifications in Cyber Security
          Awareness Training (Amazon), Introduction to Artificial Intelligence (Great Learning), Excel for Beginners (Great Learning),
          Zscaler Networking Virtual Internship (AICTE Platform), and Palo Alto Cybersecurity Virtual Internship (AICTE Platform).
        </p>
        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
          Apart from coding and cybersecurity, I have a strong interest in photo and video editing, utilizing tools such as Photoshop
          to enhance my creativity and design skills. My short-term goal is to secure a job in cybersecurity, while my long-term aspiration
          is to achieve a high-paying position in the field, continuously learning and growing as a professional.
        </p>
      </div>
    </section>
  );
}

export default About;