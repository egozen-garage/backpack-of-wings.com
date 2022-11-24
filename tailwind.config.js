const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xxs': '400px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'mobileHorizontal': '480px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1350px',
      'wideScreen': '1800px',
    },
    extend: {
      cursor: {
        'play' : 'url(./img/cursor-play.svg), pointer'
      },
      colors: {
        'backpackYellow' : '#f9fe1e',
        'backpackGray' : '#CFCFCF',
        'backpackBlue' : '#F0B4FC',
        'backpackPink' : 'rgba(240, 180, 252, 0.5)'
      },
      fontFamily: {
        sans: ["'Area Normal'", ...defaultTheme.fontFamily.sans],
        serif: ["'Apoc Revelations'", ...defaultTheme.fontFamily.serif],
        mono: ["'FT88'", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        '2xs': ['10px', '12px'],
        'xs': ['12px', '14px'],
      },
      boxShadow: {
        '2xl': '0px 0px 10px 2px rgba(0, 0, 0, 0.3)',
        '3xl': '3px 12px 10px 0px rgba(0, 0, 0, 0.3)',
        'button': '0px 0px 6px 4px rgba(0, 0, 0, 0.3)',
        'buttonBlack': '0px 0px 4px 4px rgba(0 ,0 ,0 , 0.5)',
        'innerText': 'inset 0px 2px 20px 2px rgba(0, 0, 0, 0.05)',
        'innerWindow': 'inset 0px 2px 13px 2px rgba(0, 0, 0, 0.3)',
        'innerBox': 'inset 0px 2px 20px 2px rgba(255, 255, 255, 0.5)',
      },
      inset: {
        '1/5': '20%',
        '1/6': '17%',
        '1/7': '14%',
      },
      zIndex: {
        '18': '18',
        '22': '22',
        '24': '25',
        '26': '26',
        '28': '28',
        '32': '32',
        '34': '34',
        '36': '36',
        '38': '38',
        '41': '41',
        '42': '42',
        '43': '43',
        '44': '44',
        '45': '45',
        '52' : '52',
        '54' : '54',
        '56' : '56',
        '58' : '58',
        '60': '60',
        '60': '60',
        '70': '70',
        '99': '99',
      },
      animation: {
        loadingProgressBar: 'loadingProgressBar 2s ease-in',
      },
      keyframes: {
        loadingProgressBar: {
          '0%': { width: '0%' },
          '90%': { width: '90%' },
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
