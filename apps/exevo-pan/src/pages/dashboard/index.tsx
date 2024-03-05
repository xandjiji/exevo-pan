import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { Layout, Root } from 'modules/Dashboard'
import { PreviewImageClient } from 'services'
import { useSession } from 'next-auth/react'
import { buildPageTitle, buildUrl } from 'utils'
import { jsonld, routes } from 'Constants'
import { common, dashboard } from 'locales'

const pageUrl = buildUrl(routes.DASHBOARD.ROOT)

export default function Dashboard() {
  const translations = useTranslations()

  const i18n = translations.dashboard

  const pageName = i18n.Meta.root.title
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
  })

  const pageTitle = buildPageTitle(pageName)

  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta name="description" content={i18n.Meta.root.description} />
        <meta
          property="twitter:description"
          content={i18n.Meta.root.description}
        />
        <meta property="og:description" content={i18n.Meta.root.description} />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.LOGIN, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.LOGIN, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.LOGIN, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Main>
        <Layout>
          {session && (
            <section className="grid place-items-center gap-8 lg:flex lg:items-start lg:justify-center lg:gap-16">
              <Root.Pitch proStatus={session.user.proStatus} />
              {!session.user.proStatus && (
                <Root.PurchaseForm
                  email={session.user.email}
                  initialTxId={session.user.paymentData?.id}
                  initialCharacter={session.user.paymentData?.character}
                  confirmed={session.user.paymentData?.confirmed}
                />
              )}
            </section>
          )}
        </Layout>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      dashboard: dashboard[locale as RegisteredLocale],
    },
  },
})
