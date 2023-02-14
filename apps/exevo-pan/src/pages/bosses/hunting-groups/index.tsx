import Head from 'next/head'
import { useState, useMemo } from 'react'
import { PreviewImageClient } from 'services'
import { DrawerFieldsClient } from 'services/server'
import { GetStaticProps } from 'next'
import { Hero } from 'templates'
import { Template } from 'modules/BossHunting'
import { Button, Tabs, Input, Paginator, LoadingAlert } from 'components/Atoms'
import { Select } from 'components/Organisms'
import {
  CreateGuildDialog,
  GuildList,
} from 'modules/BossHunting/modules/HuntingGroups'
import { AddIcon } from 'assets/svgs'
import { useTranslations } from 'contexts/useTranslation'
import { trpc } from 'lib/trpc'
import { caller } from 'pages/api/trpc/[trpc]'
import { useIsMounted } from 'hooks'
import { buildUrl, buildPageTitle, loadRawSrc, debounce } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, bosses } from 'locales'

type SerializablePublicHuntingGroup = Omit<PublicHuntingGroup, 'createdAt'> & {
  createdAt: number
}

type HuntingGroupsProps = {
  serializableInitialGuildList: {
    page: SerializablePublicHuntingGroup[]
    count: number
  }
  serverOptions: Option[]
  initialDataUpdatedAt: number
}

const heroSrc = loadRawSrc('/huntingGroups.png')
const pagePath = routes.BOSSES.HUNTING_GROUPS
const pageUrl = buildUrl(pagePath)

export const PAGE_SIZE = 20
const DEBOUNCE_DELAY = 700
export const DEFAULT_SERVER: Option = { name: '(any)', value: '' }

export default function HuntingGroupsPage({
  serializableInitialGuildList,
  serverOptions,
  initialDataUpdatedAt,
}: HuntingGroupsProps) {
  const { translations } = useTranslations()

  /* @ ToDo: add title */
  /* const pageName = translations.bossTracker.Meta.title */
  const pageName = 'Hunting Groups'
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: heroSrc,
  })

  const pageTitle = buildPageTitle(pageName)

  const [query, setQuery] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
    name: '',
    server: DEFAULT_SERVER.value,
  })

  const [isOpen, setOpen] = useState(false)
  const isMounted = useIsMounted()

  const guildList = trpc.listGuilds.useQuery(query, {
    enabled: isMounted,
    staleTime: 5000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    placeholderData: serializableInitialGuildList,
    refetchOnMount: false,
    initialDataUpdatedAt,
    select: (result) => ({
      ...result,
      page: result.page.map(({ createdAt, ...rest }) => ({
        ...rest,
        createdAt: new Date(createdAt),
      })),
    }),
  })

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
            onClick={() => setOpen(true)}
            className="z-1 ml-auto flex w-fit items-center gap-1.5"
          >
            <AddIcon className="-ml-2.5" />
            Create group
          </Button>
          {isOpen && (
            <CreateGuildDialog
              serverOptions={serverOptions}
              onClose={() => setOpen(false)}
            />
          )}

          <section className="grid gap-4">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="grid w-full grid-cols-2 gap-4 sm:max-w-[380px]">
                <Input
                  label="Search by name"
                  placeholder="Hunting group name"
                  allowClear
                  onChange={useMemo(
                    () =>
                      debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                          setQuery((prev) => ({
                            ...prev,
                            pageIndex: 0,
                            name: e.target.value,
                          })),
                        DEBOUNCE_DELAY,
                      ),
                    [],
                  )}
                />
                <Select
                  label="Search by server"
                  options={serverOptions}
                  defaultValue={DEFAULT_SERVER.value}
                  onChange={useMemo(
                    () =>
                      debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                          setQuery((prev) => ({
                            ...prev,
                            pageIndex: 0,
                            server: e.target.value,
                          })),
                        DEBOUNCE_DELAY,
                      ),
                    [],
                  )}
                />
              </div>

              <Paginator
                className="ml-auto w-fit"
                pageSize={PAGE_SIZE}
                totalItems={guildList.data?.count ?? 0}
                currentPage={query.pageIndex + 1}
                onChange={(newIndex) =>
                  setQuery((prev) => ({ ...prev, pageIndex: newIndex - 1 }))
                }
              />
            </div>
            <Tabs.Group className="-mb-2">
              <Tabs.Panel label="Find groups" />
              <Tabs.Panel label="My groups" />
            </Tabs.Group>
            <GuildList list={guildList.data?.page ?? []} onApply={() => {}} />

            {guildList.isFetching && <LoadingAlert>Loading...</LoadingAlert>}
          </section>
        </div>
      </Template>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [unserializableGuildList, partialServerOptions] = await Promise.all([
    caller.listGuilds({}),
    DrawerFieldsClient.fetchActiveServerOptions(),
  ])

  const serverOptions: typeof partialServerOptions = [
    DEFAULT_SERVER,
    ...partialServerOptions,
  ]

  const serializableInitialGuildList = {
    ...unserializableGuildList,
    page: unserializableGuildList.page.map(({ createdAt, ...data }) => ({
      ...data,
      createdAt: +createdAt,
    })),
  }

  return {
    props: {
      serializableInitialGuildList,
      serverOptions,
      initialDataUpdatedAt: +new Date(),
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
      },
      locale,
    },
  }
}
