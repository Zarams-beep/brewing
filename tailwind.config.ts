import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        background: '#f8f4f0',
        text: '#3e2c23',
        primary: '#6f4e37',
        secondary: '#c0a98e',
        accent: '#d2691e',
        coffeeWhite: '#fefaf6',
        mutedGray: '#d8d5d0',
        mutedGray2: '#9e9b97',

        // Dark mode colors
        dark: {
          background: '#1e1b18',
          text: '#e6dcd1',
          primary: '#b87b56',
          secondary: '#8b5e3c',
          accent: '#ffa07a',
          coffeeDark: '#2d221b',
          mutedGray: '#403c38',
          mutedGray2: '#59524c',
        },
      },
      fontFamily: {
        coffee: ['"Playfair Display"', 'serif'],
        clean: ['Raleway', 'sans-serif'],
        classic: ['Cormorant Garamond', 'serif'],
        calm: ['Quattrocento', 'serif'],
        signature: ['Pacifico', 'cursive'],
        read: ['Merriweather', 'serif'],
        clicker: ['"Clicker Script"', 'cursive'],
      },
      keyframes: {
        float:{
          "0%, 100%": {transform:"translateY(0)"},
          "50%":{transform:"translateY(-20px)"}
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounceY: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(5%)" },
        },
        bounceX: {
          "0%, 100%": { transform: "translateX(-5%)" },
          "50%": { transform: "translateX(5%)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        zoomIn: {
          from: { transform: "scale(0.8)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        slideLeft: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          from: { transform: "translateY(-100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        pulseFast: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        float:"float 3s infinite",
        wiggle: "wiggle 0.3s ease-in-out",
        bounceY: "bounceY 1s infinite",
        bounceX: "bounceX 3s infinite",
        fadeIn: "fadeIn 0.5s ease-in forwards",
        zoomIn: "zoomIn 0.5s ease-in-out",
        slideLeft: "slideLeft 0.5s ease-out",
        slideRight: "slideRight 0.5s ease-out",
        slideUp: "slideUp 0.5s ease-out",
        slideDown: "slideDown 0.5s ease-out",
        pulseFast: "pulseFast 0.8s ease-in-out infinite",
      },
    },
  },
  plugins: [require('tailwindcss-textshadow')],
};

export default config;
