/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        panel: "#1e293b",
        text: "#e2e8f0",
        primary: "#3b82f6",
        cta: "#22c55e"
      },
      fontFamily: {
        sans: ["Fira Sans", "sans-serif"],
        mono: ["Fira Code", "monospace"]
      }
    },
  },
  plugins: [],
}
