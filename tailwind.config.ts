import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F2E0",
        parchment: "#F0E8D0",
        paper: "#FBF8EF",
        bone: "#F2EAD5",
        plum: "#5B0015",
        "plum-soft": "#8C5A63",
        red: "#80AEE8",
        "red-deep": "#4A7AB8",
        "red-soft": "#9DC2EF",
        coffee: "#5B0015",
        "coffee-deep": "#3D000E",
        "coffee-soft": "#8C1F35",
        "bright-pink": "#80AEE8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-nunito)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(91, 0, 21, 0.18)",
        glow: "0 0 40px -10px rgba(128, 174, 232, 0.5)",
        pop: "4px 4px 0px 0px rgba(91, 0, 21, 1)",
        "pop-sm": "2.5px 2.5px 0px 0px rgba(91, 0, 21, 1)",
      },
      borderRadius: {
        cozy: "1.75rem",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle, rgba(91,0,21,0.12) 1px, transparent 1px)",
        "line-grid":
          "linear-gradient(rgba(91,0,21,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(91,0,21,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "18px 18px",
        "line-grid": "32px 32px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--tilt, 0deg))" },
          "50%": { transform: "translateY(-12px) rotate(var(--tilt, 0deg))" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        drift: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(6px) translateY(-8px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        sparkle: "sparkle 2.4s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
