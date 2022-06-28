import { useState, useRef } from 'react'
import Head from 'next/head'
import { Main, Hero } from 'templates'
import { Header, pages } from 'modules/Calculators'
import { TimeInput, Input } from 'components/Atoms'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, calculators } from 'locales'

const pageUrl = buildUrl(routes.STAMINA)
const { hero } = pages.Stamina

export default function Calculator() {
  const { translations } = useTranslations()

  const pageTitle = `${translations.calculators.Meta.Stamina.title} - Exevo Pan`

  const [value, setValue] = useState('12:36')
  const ref = useRef<HTMLInputElement>(null)

  console.log(ref.current)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.calculators.Meta.Stamina.description}
        />
        <meta
          property="twitter:description"
          content={translations.calculators.Meta.Stamina.description}
        />
        <meta
          property="og:description"
          content={translations.calculators.Meta.Stamina.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.EXERCISE_WEAPONS, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.EXERCISE_WEAPONS, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.EXERCISE_WEAPONS, 'pl')}
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
        <Header />
        <Hero
          title={translations.calculators.Meta.Stamina.title}
          src={hero}
          offset
        />
        <div className="grid w-96 gap-4 p-10">
          <TimeInput
            label="[Controlled] Server save daylight time"
            value={value}
            onChange={(e) => {
              console.log(e.target.value)
              setValue(e.target.value)
            }}
          />
          <TimeInput
            ref={ref}
            label="[Uncontrolled] Server save daylight time"
            defaultValue={value}
            onChange={(e) => console.log(ref.current)}
          />
          <TimeInput label="Server save daylight time" disabled />
          <TimeInput label="Server save daylight time" error="Invalid time" />
          <Input label="Server" />
          <Input label="Server" disabled />
          <Input label="Server" error="Invalid server" />
        </div>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      calculators: calculators[locale as RegisteredLocale],
    },
  },
})
