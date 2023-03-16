/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        load: {
          from: {
            scale: "0",
            opacity: "0",
          },
          to: {
            scale: "1",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
