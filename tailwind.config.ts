import type { Config } from "tailwindcss";

export default {
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        red: {
          DEFAULT: "hsl(350, 84%, 54%)",
          50: "hsl(350, 84%, 95%)",
          100: "hsl(350, 84%, 85%)",
          200: "hsl(350, 84%, 75%)",
          300: "hsl(350, 84%, 65%)",
          400: "hsl(350, 84%, 54%)",
          500: "hsl(350, 84%, 44%)",
          600: "hsl(350, 84%, 34%)",
          700: "hsl(350, 84%, 24%)",
          800: "hsl(350, 84%, 14%)",
          900: "hsl(350, 84%, 4%)",
        },
        
        black: {
          DEFAULT: "hsl(0, 0%, 0%)",
          50: "hsl(0, 0%, 95%)",
          100: "hsl(0, 0%, 90%)",
          200: "hsl(0, 0%, 80%)",
          300: "hsl(0, 0%, 70%)",
          400: "hsl(0, 0%, 60%)",
          500: "hsl(0, 0%, 50%)",
          600: "hsl(0, 0%, 40%)",
          700: "hsl(0, 0%, 30%)",
          800: "hsl(0, 0%, 20%)",
          900: "hsl(0, 0%, 10%)",
        },
        
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
        
        guardai: {
          red: {
            DEFAULT: "#ea384c",
            50: "#ffe5eb",
            100: "#ffb3c6",
            200: "#ff809e",
            300: "#ff4d75",
            400: "#ea384c",
            500: "#c52239",
            600: "#a01030",
            700: "#7a0c27",
            800: "#55061e",
            900: "#300215"
          },
          black: {
            DEFAULT: "#000000",
            50: "#e6e6e6",
            100: "#cccccc",
            200: "#b3b3b3",
            300: "#999999",
            400: "#808080",
            500: "#666666",
            600: "#4d4d4d",
            700: "#333333",
            800: "#1a1a1a",
            900: "#000000"
          }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
