/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",
        secondary: "#000",
        tertiary: "#C9C9C9", 
        darkGray: "#545454",
        darkWhite: "#F5F5F5",
        lightGreen: "#ddf5e2b2",
        boxShadow: {
          '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        }
      }
    },
  },
  plugins: [],
}

