import Head from 'next/head'
import { useState } from 'react'
import { stringify, parse } from 'devalue'
import { PreviewImageClient } from 'services'
import { DrawerFieldsClient } from 'services/server'
import { GetStaticProps } from 'next'
import { Hero } from 'templates'
import { Template, CreateGuildDialog, GuildGrid } from 'modules/BossHunting'
import { useTranslations } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
import { AddIcon } from 'assets/svgs'
import { caller } from 'pages/api/trpc/[trpc]'
import { buildUrl, buildPageTitle, loadRawSrc } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, bosses } from 'locales'

type HuntingGroupsProps = {
  serializedData: string
  serverOptions: Option[]
}

const heroSrc = loadRawSrc('/huntingGroups.png')
const pagePath = routes.BOSSES.HUNTING_GROUPS
const pageUrl = buildUrl(pagePath)

const DEFAULT_SERVER: Option = { name: '(any)', value: '' }

export default function HuntingGroupsPage({
  serializedData,
  serverOptions,
}: HuntingGroupsProps) {
  const { translations } = useTranslations()

  const [initialGuildList] = useState<{
    page: PublicHuntingGroup[]
    count: number
  }>(parse(serializedData))

  /* @ ToDo: add title */
  /* const pageName = translations.bossTracker.Meta.title */
  const pageName = 'Hunting Groups'
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: heroSrc,
  })

  const pageTitle = buildPageTitle(pageName)

  const [openCreateGuild, setOpenCreateGuild] = useState(false)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        {/* @ ToDo: add meta tags */}
        {/* <meta
          name="description"
          content={translations.bossTracker.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.bossTracker.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.bossTracker.Meta.description}
        /> */}
        <meta property="og:type" content="website" />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

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
        <Hero offset src={heroSrc} title={pageName} />

        <div className="inner-container grid gap-8 md:-mt-12">
          <Button
            onClick={() => setOpenCreateGuild(true)}
            className="z-1 ml-auto flex w-fit items-center gap-1.5"
          >
            <AddIcon className="-ml-2.5" />
            Create group
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
  const [guildList, partialServerOptions] = await Promise.all([
    caller.listGuilds({}),
    DrawerFieldsClient.fetchActiveServerOptions(),
  ])

  const serverOptions: typeof partialServerOptions = [
    DEFAULT_SERVER,
    ...partialServerOptions,
  ]

  return {
    props: {
      serializedData: stringify(guildList),
      serverOptions,
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
      },
      locale,
    },
  }
}
