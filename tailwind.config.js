/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#063970",
        secondary: "#000",
        tertiary: "#C9C9C9", 
        darkGray: "#545454",
        darkWhite: "#F5F5F5",
        lightGreen: "#ddf5e2b2",
        lightYellow: "#F7ED9D",
        yellowTheme: "#FEEF6E",
        greenTheme: "#22c55e"
      },
    },
  },
  plugins: [],
}
