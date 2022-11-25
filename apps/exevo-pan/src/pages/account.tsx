import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { UserCard, Pitch, PurchaseForm } from 'modules/Account'
import { useSession } from 'next-auth/react'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, account } from 'locales'

const pageUrl = buildUrl(routes.ACCOUNT)

export default function Account() {
  const { translations } = useTranslations()

  const pageTitle = buildPageTitle(translations.account.Meta.title)

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
          content={translations.account.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.account.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.account.Meta.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

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
                <Pitch />
                <PurchaseForm {...session.user.paymentData} />
              </section>
            </>
          ) : (
            <div
              className="loading-spinner absolute-centered h-8 w-8"
              role="alert"
            />
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
      account: account[locale as RegisteredLocale],
    },
  },
})
