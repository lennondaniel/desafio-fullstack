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
        bright: '#F4F4F7',
        danger: '#D4585A',
        primary: '#2563eb',
        edit: '#f59e0b',
        details: '#7c3aed'
      }
    },
  },
  plugins: [],
};
export default config;
