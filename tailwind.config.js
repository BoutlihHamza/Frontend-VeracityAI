/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Custom colors for dark mode
        gray: {
          850: '#1a1e2b',
          950: '#0f1118',
        },
      },
      borderWidth: {
        '16': '16px',
      },
      rotate: {
        '-30': '-30deg',
        '30': '30deg',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.800'),
              },
            },
            h1: {
              fontFamily: theme('fontFamily.heading'),
              fontWeight: '600',
            },
            h2: {
              fontFamily: theme('fontFamily.heading'),
              fontWeight: '600',
            },
            h3: {
              fontFamily: theme('fontFamily.heading'),
              fontWeight: '600',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.300'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};