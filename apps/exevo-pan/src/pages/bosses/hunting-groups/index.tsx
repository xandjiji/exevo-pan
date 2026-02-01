import Head from 'next/head'
import { useState, useMemo } from 'react'
import { stringify, parse } from 'devalue'
import { PreviewImageClient } from 'services'
import { DrawerFieldsClient } from 'services/server'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Hero } from 'templates'
import { Template, CreateGuildDialog, GuildGrid } from 'modules/BossHunting'
import { useTranslations } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
import { AddIcon } from 'assets/svgs'
import { caller } from 'pages/api/trpc/[trpc]'
import { buildUrl, buildPageTitle, loadRawSrc, SECONDS_IN } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, bosses, huntingGroups } from 'locales'

type HuntingGroupsProps = {
  serializedData: string
  baseServerOptions: Option[]
}

const heroSrc = loadRawSrc('/huntingGroups.png')
const pagePath = routes.BOSSES.HUNTING_GROUPS

export default function HuntingGroupsPage({
  serializedData,
  baseServerOptions,
}: HuntingGroupsProps) {
  const translations = useTranslations()
  const { locale } = useRouter()

  const serverOptions: typeof baseServerOptions = useMemo(
    () => [
      { name: translations.huntingGroups.defaultServer, value: '' },
      ...baseServerOptions,
    ],
    [translations.huntingGroups.defaultServer, baseServerOptions],
  )

  const [initialGuildList] = useState<{
    page: PublicHuntingGroup[]
    count: number
  }>(parse(serializedData))

  const pageName = translations.huntingGroups.Meta.title
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: heroSrc,
  })

  const pageUrl = buildUrl(pagePath, locale)
  const defaultPageUrl = buildUrl(pagePath)
  const pageTitle = buildPageTitle(pageName)

  const [openCreateGuild, setOpenCreateGuild] = useState(false)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.huntingGroups.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.huntingGroups.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.huntingGroups.Meta.description}
        />
        <meta property="og:type" content="website" />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={defaultPageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(pagePath, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(pagePath, 'es')} />
        <link rel="alternate" hrefLang="pl" href={buildUrl(pagePath, 'pl')} />
        <link rel="alternate" hrefLang="x-default" href={defaultPageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Template>
        <Hero offset src={heroSrc} title={pageName} />

        <div className="inner-container grid gap-8 md:-mt-12">
          <Button
            onClick={() => setOpenCreateGuild(true)}
            className="z-1 ml-auto flex w-fit items-center gap-1.5"
          >
            <AddIcon className="-ml-2.5 h-6 w-6" />
            {translations.huntingGroups.createGroup}
          </Button>
          {openCreateGuild && (
            <CreateGuildDialog
              serverOptions={serverOptions}
              onClose={() => setOpenCreateGuild(false)}
            />
          )}

          <GuildGrid
            initialGuildList={initialGuildList}
            serverOptions={serverOptions}
          />
        </div>
      </Template>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [guildList, baseServerOptions] = await Promise.all([
    caller.listGuilds({}),
    DrawerFieldsClient.fetchActiveServerOptions(),
  ])

  return {
    props: {
      serializedData: stringify(guildList),
      baseServerOptions,
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
        huntingGroups: huntingGroups[locale as RegisteredLocale],
      },
      locale,
    },
    revalidate: SECONDS_IN.MINUTE,
  }
}
