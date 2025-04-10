import React from "react";

function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-cyan-400 mb-8">
          Get in Touch
        </h2>
        <p className="text-lg text-center text-gray-300 mb-12">
          Have a question or want to collaborate? Feel free to reach out.
        </p>

        {/* Contact Form */}
        <form className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
          />
          {/* Email Address */}
          <input
            type="email"
            placeholder="Email Address"
            className="p-4 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
          />
          {/* Mobile Number */}
          <input
            type="text"
            placeholder="Mobile Number"
            className="p-4 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
          />
          {/* Email Subject */}
          <input
            type="text"
            placeholder="Email Subject"
            className="p-4 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
          />
          {/* Message */}
          <textarea
            placeholder="Your Message"
            rows="4"
            className="col-span-1 md:col-span-2 p-4 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
          ></textarea>
          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 rounded-md transition-all duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details (Optional) */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-300">
            You can also reach me directly at:{" "}
            <a
              href="mailto:chakreshram11@gmail.com"
              className="text-cyan-400 hover:underline"
            >
              chakreshram11@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
