/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Scans the index.html file in the root directory
    './src/**/*.{js,ts,jsx,tsx}', // Scans all JS/TS/JSX/TSX files in the src directory
  ],
  theme: {
    screens: {
      sm: '640px', // Small screens (default)
      md: '800px', // Medium screens (customized)
      lg: '1024px', // Large screens (default)
      xl: '1280px', // Extra large screens (default)
      '2xl': '1536px', // 2X large screens (default)
    },
    extend: {
      boxShadow: {
        around: '0 0 10px 0px rgba(0, 0, 0, 0.1)', // Adjust values as needed
      },
    }, // Extend or customize the default Tailwind theme here
  },
  plugins: [require('daisyui')], // Add Tailwind plugins here
};
