module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary__opacity:"var(--primary-opacity)",
        body:"var(--color-body)",
        black:"var(--color-black)",
        heading:"var(--color-heading)",
        main:"var(--color-main)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        white: "var(--color-white)", // có sẵn trong Tailwind, nhưng map lại cũng không sao
      },
    },
  },
  plugins: [],
};
