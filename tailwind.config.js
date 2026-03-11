/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#b91c1c",
        ink: "#111827",
        paper: "#f8f5ef",
        line: "#d6d3d1",
        soft: "#57534e",
      },
      boxShadow: {
        panel: "0 10px 30px rgba(17, 24, 39, 0.08)",
      },
      fontFamily: {
        display: ["Libre Baskerville", "serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        fadeUp: "fadeUp 0.45s ease-out both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
