// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//         "./src/**/*.{html,js,jsx,ts,tsx}"
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [],
// }

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        stem: {
          "0%": { transform: "scaleY(0) rotate(45deg)" },
          "100%": { transform: "scaleY(1) rotate(45deg)" },
        },
        kick: {
          "0%": { transform: "scaleY(0) rotate(-45deg)" },
          "100%": { transform: "scaleY(1) rotate(-45deg)" },
        },
        checkmark: {
          "0%, 50%": { transform: "scale(0.8)", opacity: "0.5" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        stem: "stem 0.4s ease-in forwards",
        kick: "kick 0.3s ease-in 0.4s forwards", // Delayed for smooth animation
        checkmark: "checkmark 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
