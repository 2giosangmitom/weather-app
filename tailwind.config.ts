import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": {
            transform: "translate(3px, 0)",
          },
          "50%": {
            transform: "translate(-3px, 0)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
        },
      },
      animation: {
        shake: "shake 100ms ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
