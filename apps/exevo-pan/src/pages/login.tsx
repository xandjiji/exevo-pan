import Head from 'next/head'
import { useEffect } from 'react'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { useSession, getProviders } from 'next-auth/react'
import { buildUrl, buildPageTitle, addLocalePrefix } from 'utils'
import { ExevoPanIcon } from 'assets/svgs'
import SignIn from 'components/SignIn'
import { routes, jsonld } from 'Constants'
import { AuthProviders } from 'types/next-auth'
import { common, login } from 'locales'

const pageUrl = buildUrl(routes.LOGIN)

type LoginStaticProps = {
  providers: AuthProviders
}

export default function Login({ providers }: LoginStaticProps) {
  const { translations } = useTranslations()
  const { locale, push } = useRouter()

  const pageTitle = buildPageTitle(translations.login.Meta.title)

  const { data: session } = useSession()

  useEffect(() => {
    if (session) push(addLocalePrefix({ route: routes.DASHBOARD, locale }))
  }, [session])

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.login.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.login.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.login.Meta.description}
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
        <main className="inner-container grid place-items-center py-4">
          <div className="grid place-items-center gap-10">
            <ExevoPanIcon width={120} height={120} />

            <SignIn
              providers={providers}
              state={session ? 'LOADING' : undefined}
            />
          </div>
        </main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const providers = await getProviders()

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        login: login[locale as RegisteredLocale],
      },
      providers,
    },
  }
}
