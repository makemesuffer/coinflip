/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['i.imgur.com', '(https://i.imgur.com/'],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}
