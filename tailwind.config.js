/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bai Jamjuree", "sans-serif"],
      },
      backgroundImage: {
        "main-background": "url('/src/images/bg-image2.jpg')",
        "desktop-background": "url('/src/images/bg-desktop.jpg')",
      },
    },
  },
  plugins: [],
};
