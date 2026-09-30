import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F5F0",
        canvas: "#F7F5F0",
        primary: {
          DEFAULT: "#264653",
          50: "#f0f6f7",
          100: "#d9e8eb",
          200: "#b4d3d8",
          300: "#86b6be",
          400: "#5594a1",
          500: "#264653",
          600: "#213e4b",
          700: "#1d3540",
          800: "#182c35",
          900: "#122026",
        },
        secondary: {
          DEFAULT: "#2A9D8F",
          light: "#3ec4b3",
          dark: "#1e7268",
        },
        accent: {
          DEFAULT: "#E76F51",
          light: "#ef907a",
          dark: "#cf5538",
        },
        highlight: {
          DEFAULT: "#E9C46A",
          light: "#f0d58f",
          dark: "#d1a842",
        },
        card: "#FFFFFF",
        border: "#E5E5E5",
        surface: {
          cream: "#FAF8F5",
          muted: "#EDE9E1",
          dark: "#19282F",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        editorial: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      backdropBlur: {
        xs: "2px",
        glass: "16px",
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(38, 70, 83, 0.05), 0 1px 4px -1px rgba(38, 70, 83, 0.03)",
        glass: "0 8px 32px 0 rgba(38, 70, 83, 0.08)",
        elevation: "0 20px 40px -15px rgba(38, 70, 83, 0.12)",
        float: "0 30px 60px -12px rgba(38, 70, 83, 0.18)",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
