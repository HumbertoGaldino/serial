const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },      
      colors: {
        purple: "#6741B9",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#6741B9",
        secondary: "#FFFE00",
        primaryBlack: "#3A2569"
      },
      backgroundImage: {
        discover: "url(/discover-bg.png)",
      },
      screens: {
        'sm-min': '480px',
        'sm': '560px',
        'sm-max': '680px',
        'md': '820px',
        'lg': '1070px',
        'lg-max': '1170px',
        '3xl': '1720px',
        'footer-2xl': "1400px"
      },
    },
  },
  plugins: [addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}
