import Head from 'next/head'
import { PreviewImageClient } from 'services'
import { GetStaticProps } from 'next'
import { Template } from 'modules/BossHunting'
import { Hero, NavGrid } from 'templates'
import type { NavGridItem } from 'templates'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle, loadRawSrc } from 'utils'
import { jsonld, routes } from 'Constants'
import { common, bosses } from 'locales'

const pagePath = routes.BOSSES.MAIN
const heroSrc = loadRawSrc('/bosses.png')

export default function BossHunting() {
  const pageUrl = buildUrl(pagePath)

  const { translations } = useTranslations()

  /* const pageName = translations.bosses.Meta.title */
  const pageName = 'Boss Hunting'
  /* const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: heroSrc,
  }) */

  const pageTitle = buildPageTitle(pageName)

  const navItems: NavGridItem[] = [
    {
      href: routes.BOSSES.TRACKER,
      sprite: '/sprites/store/lasting exercise sword.gif',
      title: 'Tracker',
      description: 'Tracker description',
    },
    {
      href: routes.BOSSES.GUILDS,
      sprite: '/sprites/store/lasting exercise sword.gif',
      title: 'Guilds',
      description: 'Guilds description',
    },
  ]

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        {/* <meta
          name="description"
          content={translations.bosses.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.bosses.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.bosses.Meta.description}
        /> */}
        <meta property="og:type" content="website" />

        {/* <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} /> */}

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(pagePath, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(pagePath, 'es')} />
        <link rel="alternate" hrefLang="pl" href={buildUrl(pagePath, 'pl')} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Template>
        <Hero offset title="Boss Hunting" src={heroSrc} />
        <NavGrid navItems={navItems} />
      </Template>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      bosses: bosses[locale as RegisteredLocale],
    },
    locale,
  },
})
