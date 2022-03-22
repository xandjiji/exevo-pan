const withReactSvg = require('next-react-svg')
const path = require('path')
const { i18n } = require('./next-i18next.config')

module.exports = withReactSvg({
  i18n,
  reactStrictMode: true,
  include: path.resolve(__dirname, 'src/assets/svgs'),
  images: {
    domains: [],
    deviceSizes: [24, 32, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  webpack(config) {
    return config
  },
  swcMinify: true,
})
