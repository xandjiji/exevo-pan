import { links, locales } from 'Constants'
import { TemplateConfig, UrlConfig } from './types'

const X_DEFAULT = 'x-default'

const ALTERNATIVE_LOCALES = locales.ALL_LOCALES.filter(
  (locale) => locale !== locales.DEFAULT_LOCALE,
)

const NEWLINE = '\n'

const buildUrl = ({ locale, route }: UrlConfig): string =>
  `${links.CANONICAL}${
    locale && locale !== X_DEFAULT ? `/${locale}` : ''
  }${route}`

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

const AlternateTemplate = (props: Required<UrlConfig>): string =>
  `<xhtml:link rel="alternate" hreflang="${props.locale}" href="${buildUrl(
    props,
  )}"/>`

export const XmlTemplate = ({
  route,
  date,
  changefreq,
}: TemplateConfig): string =>
  `<url>
        <loc>${buildUrl({ route })}</loc>
        <lastmod>${formatDate(date)}</lastmod>
        <changefreq>${changefreq}</changefreq>
        
        ${ALTERNATIVE_LOCALES.map((locale) =>
          AlternateTemplate({ locale, route }),
        ).join(NEWLINE)}
        ${AlternateTemplate({ locale: X_DEFAULT, route })}
    </url>`

export const XmlWrapper = (content: string): string =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${content}
</urlset>`
