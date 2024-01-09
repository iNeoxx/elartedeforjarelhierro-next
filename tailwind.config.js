const {nextui} = require("@nextui-org/react");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        footerColor: '#356E82',
        contactSectionColor: '#497EDA',
        colorInputsForm: '#6D98E1',
        colorSubtitleContact: 'rgba(0, 11, 40, 0.60);',
        currentCarousel: '#0866FF',
        notCurrentCarousel: '#C4C4C4'
      },
      boxShadow: {
        contactShadow: '10px 10px 15px 0px rgba(73, 126, 218, 0.40), -10px -10px 15px 0px rgba(73, 126, 218, 0.40)'
      }
    },
  },
  variants: {
    extend: {
      colors: {
        bgWhite: '#FFFFFF',
      }
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), nextui(), ('flowbite/plugin'),],
}
