/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F4B942',
        secondary: '#FFF8E1',
        dark: '#1a1a1a',
      },
    },
  },
  plugins: [],
}