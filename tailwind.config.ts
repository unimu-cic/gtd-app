import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#0d0d0d'
        },
        primary: {
          DEFAULT: '#ff5631'
        },
        secondary: {
          DEFAULT: '#d3c3a9'
        }
      }
    },
  },
  plugins: [],
};
export default config;
