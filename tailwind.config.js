const {nextui} = require("@nextui-org/react");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bodyColor: '#000000',
      },
    },
  },
  variants: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), nextui()],
}
