/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#f59e0b",        // amber-gold
        "accent-dim": "#d97706",  // darker gold for hover
        ink: "#f1ede6",           // warm off-white for headings
        paper: "#0f0f12",         // near-black base
        surface: "#17171c",       // card surface
        "surface-2": "#1e1e26",   // elevated surface
        "surface-3": "#26262f",   // most elevated
        line: "#2e2e38",          // dividers
        "line-soft": "#232330",   // subtle dividers
        muted: "#6b6b7e",         // muted text
        soft: "#9494a8",          // secondary text
        body: "#c4c4d4",          // body text
      },
      boxShadow: {
        panel: "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset",
        glow: "0 0 32px rgba(245,158,11,0.12)",
        "glow-sm": "0 0 16px rgba(245,158,11,0.08)",
        float: "0 20px 60px rgba(0,0,0,0.8)",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        fadeUp: "fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        fadeIn: "fadeIn 0.4s ease both",
        slideIn: "slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideIn: {
          from: { opacity: 0, transform: "translateX(-12px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
