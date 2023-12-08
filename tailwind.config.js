/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'century-gothic': ['"Century Gothic"', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}