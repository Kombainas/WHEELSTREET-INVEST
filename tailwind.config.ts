import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#000',
            a: {
              color: '#000',
              '&:hover': {
                opacity: 0.7,
              },
            },
            h1: {
              color: '#000',
            },
            h2: {
              color: '#000',
            },
            h3: {
              color: '#000',
            },
            strong: {
              color: '#000',
            },
            code: {
              color: '#000',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
