/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#16ABF8",
        secondary: "#E5E5E5",
        "very-high": "#ED4C5C",
        high: "#F8A541",
        medium: "#00A790",
        low: "#428BC1",
        "very-low": "#8942C1",
        black: "#111111",
        black300: "#4A4A4A",
        black200: "#555555",
        black100: "#888888",
        light: "#F4F4F4",
      },
      fontFamily: {
        "my-font": "Philosopher, sans-serif",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin"), require("@tailwindcss/forms")],
};
