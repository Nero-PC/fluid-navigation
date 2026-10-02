import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tide: {
          50: "#f3fafa",
          100: "#e5f3f4",
          700: "#0f6e78",
          800: "#0c5962",
          900: "#0a3d44",
        },
      },
      boxShadow: {
        glass: "0 24px 70px rgba(16, 62, 72, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
