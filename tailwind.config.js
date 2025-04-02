/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: {
          primary: "#FCDB00",
        },
        cream: {
          primary: "#F4E9D3",
        },
        brown: {
          primary: "#5A311D",
        },
      },
    },
  },
  plugins: [],
};
