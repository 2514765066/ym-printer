/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        check: "#0CBC4D",

        "222": "#222",
        "333": "#333",
        "444": "#444",

        primary: "#0169cc",
        bg: "#191919",
        list: "#202020",
        border: "#2a2a2a",
        hover: "rgba(255, 255, 255, 0.05)",

        main: "rgba(255,255,255,0.8)",
        sub: "#888",
        "main-darken": "rgba(255,255,255,0.3)",
      },
    },
  },
  plugins: [],
};
