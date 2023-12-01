import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'moderate-blue': 'hsl(238, 40%, 52%)',
          'soft-red': 'hsl(358, 79%, 66%)',
          'light-grayish-blue': 'hsl(239, 57%, 85%)',
          'pale-red': 'hsl(357, 100%, 86%)',
        },
        neutral: {
          'dark-blue': 'hsl(212, 24%, 26%)',
          'grayish-blue': 'hsl(211, 10%, 45%)',
          'light-gray': 'hsl(223, 19%, 93%)',
          'very-light-gray': 'hsl(228, 33%, 97%)',
          white: 'hsl(0, 0%, 100%)',
        },
      },
      fontSize: {
        '16': '16px',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      fontWeight: {
        400: '400',
        500: '500',
        700: '700',
      },
    },
  },
  plugins: [],
}
export default config
