/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./utils/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070a12",
        surface: "#0d121e",
        "surface-2": "#121829",
        line: "#1c2437",
        "line-2": "#2a3550",
        ink: "#e8ecf4",
        muted: "#8d97ad",
        accent: "#22d3ee",
        accent2: "#a78bfa",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        "fade-up": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        dash: {
          to: { strokeDashoffset: "-20" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        dash: "dash 1.2s linear infinite",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,0.18), 0 30px 80px -30px rgba(34,211,238,0.35)",
        lift: "0 20px 50px -25px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};
