import type { Config } from 'tailwindcss'

const config: Config = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        100: "#f5f5f5",
        200: "#1e1e1e",
        300: "#3b3b3b",
        400: "#bdbdbd",
        500: "#007df0",
        600: "#2e2e2e",
        700: "#008547"
      },
      black: "#000000",
      white: "#ffffff"
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'main': 'auto, 1fr'
      }
    },
  },
  plugins: [],
}
export default config
