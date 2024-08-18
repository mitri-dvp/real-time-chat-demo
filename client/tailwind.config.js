/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 250ms",
        "fade-out": "fade-out 250ms",
        pulse: "pulse infinite 1s",
      },
      keyframes: {
        ["fade-in"]: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        ["fade-out"]: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        ["pulse"]: {
          "0%": { opacity: "1", scale: 0 },
          "100%": { opacity: "0", scale: 1 },
        },
      },
    },
  },
  plugins: [],
};
