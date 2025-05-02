/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./.storybook/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#3857F4",
          300: "#6E85F7",
        },
        secondary: {
          500: "#253E99",
          100: "#D6DDF5",
          800: "#142152",
        },
        "hover-blue": "#BEC9EF",
        "selected-blue": "#A5B4E9",
        lime: {
          500: "#D7FF7B",
        },
        black: {
          500: "#1D1B20",
          800: "#322F37",
          300: "#B1ACB9",
          400: "#9790A2",
          600: "#645D6F",
        },
        background: {
          DEFAULT: "#F3F5FA",
          paper: "#F8FAFF",
        },
        input: {
          border: "#253E99",
          text: "#9790A2",
        },
      },
      opacity: {
        "80": "0.8",
        "20": "0.2",
      },
    },
  },
  plugins: [],
};
