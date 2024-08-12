/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#faf6fe",
          100: "#f2eafd",
          200: "#e7d9fb",
          300: "#d5bcf6",
          400: "#bb90f0",
          500: "#a165e7",
          600: "#8b46d7",
          700: "#7633bd",
          800: "#652f9a",
          900: "#53277c",
          950: "#2e0e4d",
        },
        secondary: {
          50: "#fdffe4",
          100: "#f8ffc6",
          200: "#efff93",
          300: "#dfff54",
          400: "#cdfa21",
          500: "#bef402",
          600: "#87b400",
          700: "#668803",
          800: "#516b09",
          900: "#445a0d",
          950: "#233300",
        },
      },
    },
  },
  plugins: [],
};