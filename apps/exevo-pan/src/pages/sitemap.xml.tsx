import { GetServerSideProps } from 'next'
import { BlogClient } from 'services'
import { links, routes } from 'Constants'

const MAIN_LANGUAGE = 'en'

const buildRoute = (route: string): string => `${links.CANONICAL}${route}`

const buildPostRoute = (slug: string, locale = ''): string =>
  `${links.CANONICAL}${locale}${routes.BLOG}/${slug}`

const formatDate = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const today = () => formatDate(new Date())

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

const generatePostEntries = (
  posts: BlogPost[],
  alternateLocales: string[],
): string => {
  const generateAlternates = (slug: string) => {
    let alternates = ''
    alternateLocales.forEach((locale) => {
      alternates += `
<xhtml:link
    rel="alternate"
    hreflang="${locale}"
    href="${buildPostRoute(slug, `/${locale}`)}"/>`
    })

    return alternates
  }

  let entries = ''
  posts.forEach(({ slug, date }) => {
    entries += `
<url>
    <loc>${buildPostRoute(slug)}</loc>
    <lastmod>${formatDate(new Date(date))}</lastmod>
    <changefreq>monthly</changefreq>
    ${generateAlternates(slug)}
</url>`
  })

  return entries
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
  locales,
}) => {
  const paginationOptions: PaginationOptions = { pageIndex: 0, pageSize: 999 }
  const { page: posts } = await BlogClient.queryBlog({ paginationOptions })

  const alternateLocales = (locales ?? []).filter(
    (locale) => locale !== MAIN_LANGUAGE,
  )

  if (res) {
    res.setHeader('Content-Type', 'text/xml')
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
    ${index}
    ${history}
    ${statistics}
    ${highscores}
    ${blog}
    ${advertise}
    ${about}

    ${generatePostEntries(posts, alternateLocales)}
    </urlset>`)
    res.end()
  }
  return {
    props: {},
  }
}

export default Sitemap
