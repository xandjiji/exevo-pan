import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts/useTranslation'
import { Layout, Root } from 'modules/Dashboard'
import { PreviewImageClient } from 'services'
import { useSession } from 'next-auth/react'
import { buildPageTitle, buildUrl } from 'utils'
import { jsonld, routes } from 'Constants'
import { common, dashboard } from 'locales'

export default function Dashboard() {
  const translations = useTranslations()
  const { locale } = useRouter()

  const i18n = translations.dashboard

  const pageName = i18n.Meta.root.title
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
  })

  const pageUrl = buildUrl(routes.DASHBOARD.ROOT, locale)
  const defaultPageUrl = buildUrl(routes.DASHBOARD.ROOT)
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

        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="alternate" hrefLang="en" href={defaultPageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.DASHBOARD.ROOT, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.DASHBOARD.ROOT, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.DASHBOARD.ROOT, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={defaultPageUrl} />

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
                  userId={session.user.id}
                  email={session.user.email}
                  initialTxId={session.user.paymentData?.id}
                  initialCharacter={session.user.paymentData?.character}
                  confirmed={session.user.paymentData?.confirmed}
                  initialCoupon={session.user.paymentData?.coupon}
                  initialDiscountPercent={
                    session.user.paymentData?.discountPercent
                  }
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
