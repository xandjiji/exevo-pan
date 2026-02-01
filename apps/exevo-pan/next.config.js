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
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'www.exevopan.com',
            },
          ],
          destination: 'https://exevopan.com/:path*',
          permanent: true,
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'history.exevopan.com',
            },
          ],
          destination: 'https://exevopan.com/:path*',
          permanent: true,
        },
        {
          source: '/bazaar-history',
          destination: '/',
          permanent: true,
        },
        {
          source: '/boss-tracker',
          destination: '/bosses',
          permanent: true,
        },
        {
          source: '/boss-tracker/:server',
          destination: '/bosses/:server',
          permanent: true,
        },
        {
          source: '/exevopro',
          destination: '/exevo-pro',
          permanent: true,
        },
      ]
    },
    webpack(config) {
      return config
    },
  }),
)
