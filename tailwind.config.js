/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3259A8',
        accent: '#FFC712',
        secondary: '#eef6fe',
        neutral: '#0d0e16',
        gray: '#2c3136',
        semigray: '#3f444a'
      }
    }
  },
  plugins: []
}
