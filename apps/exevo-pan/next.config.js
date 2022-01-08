const withReactSvg = require('next-react-svg')
const path = require('path')
const { i18n } = require('./next-i18next.config')

module.exports = withReactSvg({
  i18n,
  reactStrictMode: true,
  include: path.resolve(__dirname, 'src/assets/svgs'),
  webpack(config) {
    return config
  },
})
