import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "animate-[fadeIn_1s_both_1s]",
    "animate-[fadeIn_1s_both_1.2s]",
    "animate-[fadeIn_1s_both_1.4s]",
    "animate-[fadeIn_1s_both_1.6s]",
    "animate-[fadeIn_1s_both_1.8s]",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        backgroundBlack: "#080808",
      },
    },
    keyframes: {
      fadeIn: {
        "0%": {
          opacity: "0",
        },
        "100%": {
          opacity: "1",
        },
      },
      fadeOut: {
        "0%": {
          opacity: "1",
        },
        "100%": {
          opacity: "0",
        },
      },
      bounceUp: {
        "0%": {
          transform: "translateY(0px)",
        },
        "50%": {
          transform: "translateY(20px)",
        },
        "100%": {
          transform: "translateY(0px)",
        },
      },
      fadeInLogo: {
        "0%": {
          transform: "scale(1.2) translateY(35vh) translateX(-30%)",
          opacity: "0",
        },
        "70%": {
          transform: "scale(1.2) translateY(35vh) translateX(-50%)",
          opacity: "1",
        },
        "100%": {
          transform: "scale(1) translateY(5px) translateX(-50%)",
          opacity: "1",
        },
      },
      fadeFromBelow: {
        "0%": {
          transform: "translateY(20px)",
          opacity: "0",
        },
        "100%": {
          transform: "translateY(0)",
          opacity: "1",
        },
      },
      slideFromLeft: {
        "0%": {
          transform: "translateX(100px)",
          opacity: "0",
        },
        "100%": {
          transform: "translateX(0)",
          opacity: "1",
        },
      },
    },
    animation: {
      fadeInAfterDelay: "fadeIn 1s both 1s",
    },
  },
  plugins: [],
};
export default config;
