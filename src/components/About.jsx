import React from "react";

function About() {
  return (
    <section id="about" className="py-20 bg-gray-800 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-cyan-400">About Me</h2>
        <p className="mt-4 text-lg">
          I am a dedicated student currently pursuing studies in Cybersecurity, with a growing 
          expertise in Full Stack Development. My passion lies in developing secure, efficient, 
          and scalable web applications, and I continuously seek to enhance my skills in both 
          frontend and backend technologies. In addition to my technical abilities, I have a 
          strong interest in photo editing, which helps me combine creativity with precision in 
          both design and technical problem-solving. 
        </p>
        <p className="mt-4 text-lg">
          My academic journey, coupled with hands-on projects, has provided me with a solid 
          foundation to contribute effectively to diverse projects. I am committed to continuous 
          growth in my field and am excited about exploring opportunities where I can apply my 
          knowledge and skills while learning from industry professionals.
        </p>
      </div>
    </section>
  );
}

export default About;
