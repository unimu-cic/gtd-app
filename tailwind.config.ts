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
          DEFAULT: "#0d0d0d",
          300: "#47423a",
          500: "#1e1e1e",
        },
        primary: {
          DEFAULT: "#ff5631",
        },
        secondary: {
          DEFAULT: "#d3c3a9",
          300: "#bbaa8d",
          500: "#cebea4",
        },
      },
    },
  },
  plugins: [],
};
export default config;
