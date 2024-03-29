/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5385D",
        secondary: "#F01F48",
      },
      screens: {
        "custom-md": "1030px", // Define your custom breakpoint here
      },
    },
  },
  plugins: [],
};
