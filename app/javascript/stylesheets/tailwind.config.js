module.exports = {
  mode: 'jit',
  purge: {
    enabled: ["production", "staging"].includes(process.env.NODE_ENV),
    content: [
      "./**/*.html.erb",
      "./**/**/*.html.erb",
      "./**/*.html+phone.erb",
      "./app/helpers/**/*.rb",
      "./app/javascript/**/*.js",
    ],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  themes: [
    'emerald', // first one will be the default theme
    'dark',
    'forest',
    'synthwave'
  ],
}
