module.exports = {
  content: ["web/src/app/companies/page.tsx"],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
        "3xl": "1600px",
      },
      keyframes: {
        wiggle: {
          "0%": { left: "0%" },
          "5%": { left: "-100%" },
          "10%": { left: "-100%" },
          "20%": { left: "-200%" },
          "30%": { left: "-200%" },
          "40%": { left: "-300%" },
          "50%": { left: "-300%" },
          "60%": { left: "-400%" },
          "70%": { left: "-400%" },
          "80%": { left: "0%" },
          "100%": { left: "0%" },
        },
        fadeRed: {
          "0%": { color: "white" },
          "50%": { color: "#ef4444" },
          "100%": { color: "white" },
        },
      },
      animation: {
        wiggle: "wiggle 20s ease-in-out 3s infinite",
        fadeRed: "fadeRed 2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
