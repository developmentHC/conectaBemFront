/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "#F3F5FA",
        button: "#D7FF7B",
        "input-code-border": "#253E99",
        inputCodeText: "#9790A2",
      },
      boxShadow: {
        menuSubItems: "0px 4px 16px 0px rgba(145, 158, 171, 0.16)",
      },
    },
  },
  plugins: [],
};
