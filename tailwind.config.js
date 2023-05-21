/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: '640px',
      dekstop: '1248px',
    },
    colors: {
      white: '#FFFFFF',
      black: '#111827',
      warning: '#FACC15',
      'gray-50': '#EEF2F6',
      'gray-300': '#ADB5C2',
      'gray-400': '#929AAA',
      'gray-500': '#737D8C',
      'gray-600': '#535A65',
      'gray-700': '#383E47',
      'gray-bg': '#ADB5C299',
      'green-50': '#F6FEFA',
      'green-300': '#79D2B7',
      'green-400': '#14B885',
      'green-500': '#059669',
      'green-600': '#036345',
      'green-700': '#023B29',
      'error-50': '#F7DDD4',
      'error-400': '#EF372A',
      'error-500': '#C8291E',
    },
    boxShadow: {
      1: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
      2: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
      3: '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
      4: '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
      5: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
    },
    fontSize: {
      h1: ['60px', { lineHeight: '74px' }],
      h2: ['48px', { lineHeight: '64px' }],
      h3: ['38px', { lineHeight: '49px' }],
      h4: ['30px', { lineHeight: '37px' }],
      h5: ['28px', { lineHeight: '34px' }],
      h6: ['20px', { lineHeight: '30px' }],
      p1: ['18px', { lineHeight: '23px' }],
      p2: ['16px', { lineHeight: '24px' }],
      p3: ['14px', { lineHeight: '20px' }],
      p4: ['12px', { lineHeight: '18px' }],
      p5: ['8px', { lineHeight: '14px' }],
    },

    extend: {},
  },
  plugins: [],
};
