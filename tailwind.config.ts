import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        MainBackground: "#fdfcfc",
        BlackText: "#333334",
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        geist: 'var(--font-geist-sans)',
        mono: 'var(--font-geist-mono)',
      },
      animation: {
        spinSlow: 'spin 10s linear infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
