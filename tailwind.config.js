/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(249, 115, 22, 0.12)',
        'warm-lg': '0 8px 40px rgba(249, 115, 22, 0.25)',
        'cart': '0 -4px 30px rgba(249, 115, 22, 0.12)',
      },
    },
  },
  plugins: [],
}
