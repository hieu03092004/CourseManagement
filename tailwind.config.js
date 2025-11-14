module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-purple1',
    'bg-green1',
    'bg-hightlight',
    'text-white',
    'text-black',
    'text-dark1',
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
        primaryAdmin: "var(--color-main-admin)",
        purple1: "var(--color-purple-1)",
        green1: "var(--color-green-1)",
        dark1: "var(--color-dark-1)",
        hightlight: "var(--color-hightlight)",
      },
    },
  },
  plugins: [],
};
