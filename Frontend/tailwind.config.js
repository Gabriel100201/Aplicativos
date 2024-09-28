/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#8FBF9F',
          200: '#68a67d',
          300: '#24613b',
        },
        accent: {
          '50': '#fffaea',
          '100': '#fff2c5',
          '200': '#ffe586',
          '300': '#ffd046',
          '400': '#ffbb1c',
          '500': '#f18f01',
          '600': '#e17000',
          '700': '#bb4b02',
          '800': '#973a09',
          '900': '#7c300b',
          '950': '#481600',
        },

        text: {
          100: '#353535',
          200: '#5f5f5f',
        },
        bg: {
          100: '#F5ECD7',
          200: '#ebe2cd',
          300: '#c2baa6',
        },
      },
    },
  },
  plugins: [],
};