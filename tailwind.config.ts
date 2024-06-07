import withMT from "@material-tailwind/react/utils/withMT";
import colors from "tailwindcss/colors";

const config = withMT({
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    colors: {
      ...colors,
      background: "hsl(var(--background) / <alpha-value>)",
      primary: "hsl(var(--primary) / <alpha-value>)",
      "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
      edit: "hsl(var(--edit) / <alpha-value>)",
      "edit-foreground": "hsl(var(--edit-foreground) / <alpha-value>)",
      link: "hsl(var(--link) / <alpha-value>)",
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
});

export default config;
