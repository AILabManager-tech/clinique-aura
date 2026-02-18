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
        // NEXOS: Palette Clinique Aura — Serein apaisant, naturel lumineux
        sky: {
          50: "#F0F8FC",
          100: "#D9EFF8",
          200: "#B3DFF1",
          300: "#8DCFEA",
          400: "#6EBFDF",
          500: "#5BA4C9",
          600: "#4888AD",
          700: "#366C8A",
          800: "#245068",
          900: "#133545",
        },
        sage: {
          50: "#F4F8F3",
          100: "#E4EFE2",
          200: "#CBDFC7",
          300: "#B2CFAC",
          400: "#A8C5A0",
          500: "#8BAF82",
          600: "#6E9A65",
          700: "#567A4F",
          800: "#3E5A39",
          900: "#263A23",
        },
        peach: {
          50: "#FEF6F0",
          100: "#FDEADB",
          200: "#FAD4B7",
          300: "#F7BE93",
          400: "#F4B183",
          500: "#E9955F",
          600: "#D4783C",
          700: "#A85D2D",
          800: "#7C431F",
          900: "#512A12",
        },
        pearl: {
          50: "#FFFFFF",
          100: "#FDFEFE",
          200: "#FAFCFD",
          300: "#F0F5F7",
          400: "#E0E8EC",
          500: "#B5C4CC",
          600: "#8AA0AC",
          700: "#667D8A",
          800: "#455A65",
          900: "#253740",
        },
        charcoal: {
          DEFAULT: "#2D3436",
          light: "#3D4648",
          dark: "#1D2324",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.08)", opacity: "0.9" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-left": "fade-in-left 0.6s ease-out forwards",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        breathe: "breathe 5s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(91,164,201,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,164,201,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-40": "40px 40px",
      },
    },
  },
  plugins: [],
};
export default config;
