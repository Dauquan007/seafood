/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // We are explicitly aiming for a dark theme based on the style
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#60A5FA',
        cta: '#F97316',
        background: '#0F172A', // Darker background for OLED dark mode
        panel: '#1E293B',
        text: '#F8FAFC', // Lighter text for dark mode
      },
      fontFamily: {
        sans: ['"Fira Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 4px 6px rgba(0,0,0,0.1)',
        'lg': '0 10px 15px rgba(0,0,0,0.1)',
        'xl': '0 20px 25px rgba(0,0,0,0.15)',
        'glow': '0 0 10px rgba(59, 130, 246, 0.5)', // Mentioned in the rules
      }
    },
  },
  plugins: [],
}
