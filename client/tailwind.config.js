/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#f1f5f9",
        dark: "#1f2937",
        azul: "rgb(99 102 241)",
      },
    },
  },
  plugins: [],
};