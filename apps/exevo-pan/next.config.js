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

module.exports = withPreact({
  i18n,
  reactStrictMode: true,
  images: {
    domains: [],
    deviceSizes: [24, 32, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://exevopan.com' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  webpack(config) {
    return config
  },
})
