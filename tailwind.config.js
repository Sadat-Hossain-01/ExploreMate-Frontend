/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [require("flowbite/plugin")],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // custom bg colors
        "primary-col": "var(--primary-col)",
        "secondary-col": "var(--secondary-col)",
        "accent-col": "var(--accent-col)",

        // custom text colors
        "primary-ink": "var(--primary-ink)",
        "accent-ink": "var(--accent-ink)",

        // flowbite-svelte
        primary: {
          50: "#FFF5F2",
          100: "#FFF1EE",
          200: "#FFE4DE",
          300: "#FFD5CC",
          400: "#FFBCAD",
          500: "#FE795D",
          600: "#EF562F",
          700: "#EB4F27",
          800: "#CC4522",
          900: "#A5371B",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        Noto: ["Noto Sans", "sans-serif"],
        NotoSerif: ["Noto Serif", "serif"],
      },
    },
  },
};

module.exports = config;
