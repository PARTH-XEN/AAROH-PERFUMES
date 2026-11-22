/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#040404',
          900: '#070707',
          800: '#0D0C0B',
          700: '#141210',
          600: '#1C1917',
        },
        gold: {
          bright: '#F3D69B',
          light: '#DEC187',
          DEFAULT: '#C6A36A',
          deep: '#A37E46',
          dark: '#7A5B2B',
          muted: '#8B704A',
        },
        ivory: {
          light: '#FFFFFF',
          DEFAULT: '#F5EFE6',
          muted: '#D8CEBE',
          dim: 'rgba(245, 239, 230, 0.65)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Didot', 'Bodoni MT', 'serif'],
        sans: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ethereal: '0.4em',
        monumental: '0.6em',
      }
    },
  },
  plugins: [],
}
