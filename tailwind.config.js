/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:     "#2563EB",
          blueDark: "#1D4ED8",
          blueLight:"#3B82F6",
          black:    "#000000",
          dark:     "#0A0A0A",
          darker:   "#111111",
          gray:     "#1A1A1A",
          chrome:   "#D4D8E2",
          smoke:    "#F5F6F8",
          accent:   "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Barlow Condensed", "Impact", "sans-serif"],
      },
      animation: {
        "fade-in":    "fadeIn 0.4s ease-out",
        "slide-up":   "slideUp 0.4s ease-out",
        "pulse-ring": "pulseRing 1.8s ease-out infinite",
      },
      keyframes: {
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:   { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseRing: { "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(37,99,235,0.5)" }, "70%": { transform: "scale(1)", boxShadow: "0 0 0 10px rgba(37,99,235,0)" }, "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(37,99,235,0)" } },
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(135deg, #000000 0%, #0a0a0a 60%, #0a1628 100%)",
      },
    },
  },
  plugins: [],
};
