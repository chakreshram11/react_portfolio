/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 20px 5px rgba(0, 255, 255, 0.6)",
      },
      animation: {
        typing: "typing 3s linear 1 normal both, blink 0.75s step-end infinite",
      },
      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
         "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "currentColor" },
        },
      },
      borderWidth: {
        typing: "2px", // Customize the blinking cursor's width
      },
    },
  },
  plugins: [  
    require("tailwind-clip-path"),
  ],
};
