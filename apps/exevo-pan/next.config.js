const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
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

module.exports = withBundleAnalyzer(
  withPreact({
    i18n,
    reactStrictMode: true,
    images: {
      domains: [],
      deviceSizes: [24, 32, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    /* @ ToDo: remove this redirect in the future */
    async redirects() {
      return [
        {
          source: '/bazaar-history',
          destination: '/',
          permanent: true,
        },
      ]
    },
    webpack(config) {
      return config
    },
  }),
)
