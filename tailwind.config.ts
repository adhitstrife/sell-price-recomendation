import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2d6a4f",
          container: "#95d4b3",
          fixed: "#b1f0ce",
          on: "#ffffff",
          onContainer: "#a8e7c5",
        },
        secondary: {
          DEFAULT: "#4a5568",
          container: "#d5e0f7",
          on: "#ffffff",
          onContainer: "#586377",
        },
        tertiary: {
          DEFAULT: "#e67e22",
          container: "#ffdcc5",
          on: "#ffffff",
          onContainer: "#ffd0b2",
        },
        destructive: {
          DEFAULT: "#ef4444",
          on: "#ffffff",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
          on: "#ffffff",
          onContainer: "#93000a",
        },
        surface: {
          DEFAULT: "#f7f9fb",
          dim: "#d8dadc",
          bright: "#f7f9fb",
          container: {
            lowest: "#ffffff",
            low: "#f2f4f6",
            DEFAULT: "#eceef0",
            high: "#e6e8ea",
            highest: "#e0e3e5",
          },
          variant: "#e0e3e5",
        },
        outline: {
          DEFAULT: "#707973",
          variant: "#bfc9c1",
        },
        onSurface: {
          DEFAULT: "#191c1e",
          variant: "#404943",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        chef: "0.5rem",
        "chef-lg": "1rem",
        "chef-xl": "1.5rem",
      },
      boxShadow: {
        "chef-sm": "0 2px 6px rgba(45,106,79,0.04)",
        "chef": "0 4px 12px rgba(45,106,79,0.05)",
        "chef-lg": "0 8px 24px rgba(45,106,79,0.08)",
        "chef-overlay": "0 16px 48px rgba(45,106,79,0.15)",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 1.1s linear infinite",
        "fade-in": "fade-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
