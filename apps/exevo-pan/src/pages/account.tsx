import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { UserCard, Pitch, PurchaseForm } from 'modules/Account'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { buildUrl, buildPageTitle, addLocalePrefix } from 'utils'
import { Button } from 'components/Atoms'
import { routes, jsonld } from 'Constants'
import { common } from 'locales'

const pageUrl = buildUrl(routes.ACCOUNT)

// @ ToDo: add meta tags content
// @ ToDo: build page title from translations

export default function Account() {
  const { translations } = useTranslations()
  const { locale } = useRouter()

  /* const pageTitle = buildPageTitle(translations.homepage.Meta.title) */
  const pageTitle = buildPageTitle('My Account')

  const { data: session, status } = useSession()

  console.log(session)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          /* content={translations.homepage.Meta.description} */
        />
        <meta
          property="twitter:description"
          /* content={translations.homepage.Meta.description} */
        />
        <meta
          property="og:description"
          /* content={translations.homepage.Meta.description} */
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
        <main className="inner-container grid gap-8 py-8 lg:block">
          <UserCard user={session?.user} />

          {session && (
            <section className="grid place-items-center gap-8 lg:mt-24 lg:flex lg:items-center lg:justify-center lg:gap-16">
              <Pitch />
              <PurchaseForm {...session.user.paymentData} />
            </section>
          )}

          {/* <Button
            type="button"
            onClick={() =>
              signOut({
                callbackUrl: addLocalePrefix({
                  route: routes.HOME,
                  locale,
                  absolute: true,
                }),
              })
            }
          >
            Sign out
          </Button> */}
        </main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
    },
  },
})
