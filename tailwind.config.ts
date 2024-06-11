import colors from "tailwindcss/colors";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    colors: {
      ...colors,
      primary: "hsl(var(--primary) / <alpha-value>)",
      "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
      secondary: "hsl(var(--secondary) / <alpha-value>)",
      "secondary-foreground":
        "hsl(var(--secondary-foreground) / <alpha-value>)",
      edit: "hsl(var(--edit) / <alpha-value>)",
      "edit-foreground": "hsl(var(--edit-foreground) / <alpha-value>)",
      success: "hsl(var(--success) / <alpha-value>)",
      error: "hsl(var(--error) / <alpha-value>)",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
  plugins: [require("tailwindcss-animate")],
};

export default config;
