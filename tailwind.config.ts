import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  
  plugins: [require("daisyui")], // Added the daisyui plugin here
  
} satisfies Config;
