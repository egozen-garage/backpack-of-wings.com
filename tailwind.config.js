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
    extend: {},
  },
  plugins: [],
}
