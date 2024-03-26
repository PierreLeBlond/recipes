import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-roboto-mono)"],
      },
      boxShadow: {
        pressed:
          "inset 4px 4px 0px rgba(0, 0, 0, 0.1), inset -4px -4px 0px rgba(255, 255, 255, 0.6)",
        pop: "inset 4px 6px 0px rgba(255, 255, 255, 0.6), inset -4px -6px 0px rgba(0, 0, 0, 0.1)",
        fly: "0px 4px 0px 0px rgba(0, 0, 0, 0.2)",
        high: "0px 12px 0px 0px rgba(0, 0, 0, 0.2)",
      },
    },
  },
});

export default config;
