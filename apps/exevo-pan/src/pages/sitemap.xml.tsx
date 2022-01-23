import { GetServerSideProps } from 'next'
import { links, routes } from 'Constants'

const buildRoute = (route: string): string => `${links.CANONICAL}${route}`

const today = () => {
  const now = new Date()
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
}

const Sitemap: React.FC = () => null

const index = `
<url>
    <loc>${links.CANONICAL}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>always</changefreq>
</url>`

const history = `
<url>
    <loc>${buildRoute(routes.BAZAAR_HISTORY)}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>hourly</changefreq>
</url>`

const statistics = `
<url>
    <loc>${buildRoute(routes.STATISTICS)}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>daily</changefreq>
</url>`

const highscores = `
<url>
    <loc>${buildRoute(routes.HIGHSCORES)}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>daily</changefreq>
</url>`

const blog = `
<url>
    <loc>${buildRoute(routes.BLOG)}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>daily</changefreq>
</url>`

const advertise = `
<url>
    <loc>${buildRoute(routes.ADVERTISE)}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>always</changefreq>
</url>`

const about = `
<url>
    <loc>${buildRoute(routes.ABOUT)}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>monthly</changefreq>
</url>`

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader('Content-Type', 'text/xml')
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${index}
    ${history}
    ${statistics}
    ${highscores}
    ${blog}
    ${advertise}
    ${about}
    </urlset>`)
    res.end()
  }
  return {
    props: {},
  }
}

export default Sitemap
