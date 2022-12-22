import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { UserCard, Pitch, PurchaseForm } from 'modules/Dashboard'
import { PreviewImageClient } from 'services'
import { useSession } from 'next-auth/react'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, dashboard } from 'locales'

const pageUrl = buildUrl(routes.DASHBOARD)

export default function Dashboard() {
  const { translations } = useTranslations()

  const pageName = translations.dashboard.Meta.title
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

        <meta
          name="description"
          content={translations.dashboard.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.dashboard.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.dashboard.Meta.description}
        />
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
        <main className="inner-container relative grid gap-8 py-8 lg:block">
          {session ? (
            <>
              <section className="animate-fadeIn">
                <UserCard user={session.user} />
              </section>
              <section className="animate-fadeIn grid place-items-center gap-8 lg:mt-24 lg:flex lg:items-center lg:justify-center lg:gap-16">
                <Pitch proStatus={session.user.proStatus} />
                {!session.user.proStatus && (
                  <PurchaseForm {...session.user.paymentData} />
                )}
              </section>
            </>
          ) : (
            <div className="absolute-centered">
              <div className="loading-spinner h-8 w-8" role="alert" />
            </div>
          )}
        </main>
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
