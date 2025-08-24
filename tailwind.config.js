// /** @type {import('tailwindcss').Config} */
// const plugin = require('tailwindcss/plugin');

// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: 'var(--primary, #faf9f6)',
//         secondary: 'var(--secondary, #ffffff)',
//         'accent-first': 'var(--accent-first, #556b2f)',
//         'accent-second': 'var(--accent-second, #d2691e)',
//         black: 'var(--black, #000000)',
//       },
//       keyframes: {
//         slide: {
//           '0%': { transform: 'translateX(0)' },
//           '100%': { transform: 'translateX(-50%)' },
//         },
//       },
//       animation: {
//         slide: 'slide 20s linear infinite',
//       },
//     },
//   },
//   plugins: [
//     plugin(function ({ addVariant }) {
//       addVariant('autofill', '&:-webkit-autofill, &:-moz-autofill');
//     }),
//   ],
//   important: true,
// };
