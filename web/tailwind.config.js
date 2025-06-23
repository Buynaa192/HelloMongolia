
module.exports = {
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { left: '0%' },
          '5%': { left: '-100%' },
          '10%': { left: '-100%' },
          '20%': { left: '-200%' },
          '30%': { left: '-200%' },
          '40%': { left: '-300%' },
          '50%': { left: '-300%' },
          '60%': { left: '-400%' },
          '70%': { left: '-400%' },
          '80%': { left: '0%' },
          '100%': { left: '0%' },
        },
      },
      animation: {
        wiggle: 'wiggle 20s ease-in-out 3s infinite',
      },
    },
  },
  plugins: [],
}