/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#F97316',
          orangeDark: '#EA580C',
          orangeLight: '#FFEDD5',
          slate: '#0F172A',
          slateCard: '#1E293B',
          slateMuted: '#334155',
          bg: '#0B1120',
          bgAlt: '#0E1526',
        },
      },
      backgroundImage: {
        'grid-pattern':
          'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-24': '24px 24px',
      },
    },
  },
  plugins: [],
};

