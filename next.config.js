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
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
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
})
