import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        canvas: "#F7F7F5",
        line: "#E8E8E5",
        accent: "#C7F36B",
      },
    },
  },
  plugins: [],
};

export default config;
