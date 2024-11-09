import type { Config } from "tailwindcss";
import twa from "tailwindcss-animate";
import { nextui } from "@nextui-org/react";

// new theme
// blue 59B5CA
// orange F6C38E
// dark 202221
// light F6C38E
// gray 898A8C
// faded 2C2F2E

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        inter: ["var(--font-inter)"],
        inst: ["var(--font-inst)"],
        jet: ["var(--font-jet)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        backgroundPositionSpin:
          "background-position-spin 3000ms infinite alternate",
      },
    },
  },
  plugins: [
    twa,
    nextui({
      themes: {
        light: {
          colors: {
            default: "#fafafa",
            background: "#fafafa",
            foreground: "#1B1F22",
            primary: {
              50: "#fafafa",
              100: "#e1e2e2",
              200: "#c8c9ca",
              300: "#b0b1b2",
              400: "#97999a",
              500: "#7e8082",
              600: "#65686a",
              700: "#4d5052",
              800: "#34373a",
              900: "#1b1f22",
              foreground: "#1B1F22",
              DEFAULT: "#1B1F22",
            },
            secondary: {
              100: "#FDFEFE",
              200: "#FCFDFE",
              300: "#FAFCFE",
              400: "#F8FBFD",
              500: "#F6F9FC",
              600: "#B3C4D8",
              700: "#7B92B5",
              800: "#4E6692",
              900: "#2F4578",
              foreground: "#001744",
              DEFAULT: "#CEE1F1",
            },
          },
        },
        dark: {
          colors: {
            background: "#1B1F22",
            //#030712 #111827 #18181b #09090b #0a0a0a #171717 #0c0a09
            foreground: "#fafafa",
            primary: {
              100: "#09090b",
              200: "#18181b",
              300: "#27272a",
              400: "#3f3f46",
              500: "#52525b",
              600: "#71717a",
              700: "#a1a1aa",
              800: "#d4d4d8",
              900: "#fafafa",
              foreground: "#fafafa",
              DEFAULT: "#fafafa",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;

export default config;
