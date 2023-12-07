/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#f1f5f9",
        dark: "rgb(17 24 39)",
        azul: "rgb(99 102 241)",
        branco: "#e4e7eb",
        borderColor: "#FFC100",
      },
      fontFamily: {
        dm: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
