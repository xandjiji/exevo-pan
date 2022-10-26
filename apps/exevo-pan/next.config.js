const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: [],
    deviceSizes: [24, 32, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  webpack(config) {
    return config
  },
}
