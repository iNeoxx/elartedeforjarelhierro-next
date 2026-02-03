import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'tilt-shaking': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'slideinbefore': {
          'from': { marginLeft: '50%', width: '150px' },
          'to': { marginLeft: '1%', width: '150px' },
        },
        'slideinafter': {
          'from': { marginRight: '50%', width: '150px' },
          'to': { marginRight: '1%', width: '150px' },
        },
        // Nuevas animaciones para Acerca del Sitio
        'slideInLeft': {
          '0%': { transform: 'translateX(-300px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slideInRight': {
          '0%': { transform: 'translateX(300px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'tilt-shaking': 'tilt-shaking 0.5s ease-in-out 4',
        'slideinbefore': 'slideinbefore 2.5s ease-out forwards',
        'slideinafter': 'slideinafter 2.5s ease-out forwards',
        // Alias para usar en los componentes
        'slide-left': 'slideInLeft 1s ease-out forwards',
        'slide-right': 'slideInRight 1s ease-out forwards',
      }
    },
  },
  darkMode: "class",
}

export default config