/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        custom: {
          primary: "#1E88E5",
          primaryhover: "#0969da",
          secondary: "#F2F5FA",
          background: "#FFFFFF",
          border: {
            focused: "#00ADEE",
            gray: "#8A8894",
          },
          text: {
            black: "#181A20",
            white: "#FFFFFF",
            gray: "#8A8894",
            lightgrey: "#c9c8d3",
            disable: "#c5c0db",
            validation: "#ffe7b8",
            error: "#b31612",
            success: "#439f6e",
          },
          button: {
            primary: {
              bgdefault: "#1e88e5",
              textdefault: "#ffffff",
              bghover: "#0969da",
              texthover: "#FFFFFF",
              bgfocused: "#0969da",
              bgactive: "#0969da",
              textactive: "#ffffff",
            },
            secondary: {
              bgdefault: "",
              textdefault: "#1e88e5",
              bghover: "#f2f5fa",
              texthover: "#1e88e5",
              strokefocused: "#00adee",
              bgactive: "#f2f5fa",
              textactive: "#0969da",
            },
            tertiary: {
              bgdefault: "",
              textdefault: "#1e88e5",
              bghover: "#f2f5fa",
              texthover: "#1e88e5",
              strokefocused: "#00adee",
              bgactive: "#f2f5fa",
              textactive: "#1e88e5",
            },
          },
        },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
