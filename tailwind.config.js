/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
        colors: {
          'primary': '#1E90FF',
          'simple-gray': '#131313',
          'dark-light': '#1a1a1a',
          'label-white': "#8f8f8f",
          'blue-button': '#2b09ff',
          'dark-header': '#151515',
          'border-conversations': '#5454543d'
        }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}



