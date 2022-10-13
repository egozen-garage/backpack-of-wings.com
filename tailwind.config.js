module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['Space Grotesk', 'sans'],
      serif: ['Playfair Display', 'serif'],
      monospace: ['DM Mono', 'monospace'],
    },
    extend: {
      boxShadow: {
        '2xl': '0px 0px 10px 2px rgba(0, 0, 0, 0.3)',
        '3xl': '3px 12px 10px 0px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
