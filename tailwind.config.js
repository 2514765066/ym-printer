/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#191919",
        primary: "rgb(35, 131, 226)",
        main: "rgba(255,255,255,0.8)",
        "main-darken": "rgba(255,255,255,0.3)",
        sub: "rgba(255,255,255,0.6)",

        list: "#202020",
        hover: "rgba(255, 255, 255, 0.05)",
        border: "#2a2a2a",
        check: "#0CBC4D",
      },
    },
  },
  plugins: [],
};
