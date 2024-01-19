import { Config } from "tailwindcss";
export default <Config>{
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        pb: "#0F3877",
      },
      fontSize: {
        '16': ['16px', '1px']
      }
    },
  },
  plugins: [],
};
