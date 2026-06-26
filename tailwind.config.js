/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        "border-subtle": "hsl(var(--border-subtle))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        "background-subtle": "hsl(var(--background-subtle))",
        "background-elevated": "hsl(var(--background-elevated))",
        foreground: "hsl(var(--foreground))",
        "foreground-muted": "hsl(var(--foreground-muted))",
        "foreground-subtle": "hsl(var(--foreground-subtle))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          subtle: "hsl(var(--primary-subtle))",
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
        success: "hsl(var(--success))",
      },
      borderRadius: {
        "2xl": "1rem",
        xl: "0.875rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        "aurora": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "caret": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "ping-soft": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "draw-circle": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "rotate-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "drift-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(8vw, 6vh) scale(1.15)" },
        },
        "drift-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-6vw, 8vh) scale(0.9)" },
        },
        "drift-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(5vw, -7vh) scale(1.1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "shimmer": "shimmer 2.5s linear infinite",
        "blob-drift": "blob-drift 18s ease-in-out infinite",
        "aurora": "aurora 12s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "caret": "caret 1.1s steps(2) infinite",
        "ping-soft": "ping-soft 1.6s cubic-bezier(0, 0, 0.2, 1) infinite",
        "draw-circle": "draw-circle 3s ease-out forwards",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "rotate-slow": "rotate-slow 36s linear infinite",
        "rotate-slower": "rotate-slow 60s linear infinite",
        "rotate-reverse": "rotate-slow 48s linear infinite reverse",
        "drift-1": "drift-1 26s ease-in-out infinite",
        "drift-2": "drift-2 32s ease-in-out infinite",
        "drift-3": "drift-3 38s ease-in-out infinite",
      },
      fontFamily: {
        // A hand-set book — no sans, no mono.
        sans: ['"EB Garamond"', "Georgia", "serif"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        serif: ['"EB Garamond"', "Georgia", "serif"],
        sc: ['"Cormorant SC"', '"Cormorant Garamond"', "serif"],
        mono: ['"EB Garamond"', "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        "extra-tight": "-0.03em",
      },
      backgroundImage: {
        "grid-light": "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
        "grid-dark": "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
