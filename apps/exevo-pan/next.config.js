const withReactSvg = require('next-react-svg')
const path = require('path')
const { i18n } = require('./next-i18next.config')

const withPreact = (next = {}) =>
  Object.assign({}, next, {
    webpack(config, options) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        'create-react-class': 'preact-compat/lib/create-react-class',
        'react-dom-factories': 'preact-compat/lib/react-dom-factories',
      })

      if (typeof next.webpack === 'function') {
        return next.webpack(config, options)
      }

      return config
    },
  })

module.exports = withPreact(
  withReactSvg({
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
  }),
)
