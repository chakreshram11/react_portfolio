import React from "react";

function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-cyan-400 mb-8">
          Get in Touch
        </h2>
        <p className="text-lg text-center text-gray-300 mb-12">
          Have a question or want to collaborate? Feel free to reach out.
        </p>

        {/* Contact Form */}
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* ✅ Web3Forms Access Key */}
          <input type="hidden" name="access_key" value="c58c2668-e2ff-4598-a489-1cb3e4770d55" />

          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="p-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
          />

          {/* Email Address */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="p-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
          />

          {/* Mobile Number */}
          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            className="p-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
          />

          {/* Email Subject */}
          <input
            type="text"
            name="subject"
            placeholder="Email Subject"
            className="p-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            required
            className="col-span-1 md:col-span-2 p-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent transition-all"
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
