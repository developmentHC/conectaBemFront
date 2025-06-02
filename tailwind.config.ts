/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./.storybook/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        default: "#F3F5FA",
        button: "#D7FF7B",
        "input-code-border": "#253E99",
        inputCodeText: "#9790A2",
        secondary: "#1D1B20",
        "blue-secondary": "#3858F4",
        alert: "#A34848",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "scaleY(0.95)" },
          "100%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease",
      },
    },
  },
  plugins: [],
};
