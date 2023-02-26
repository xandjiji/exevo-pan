import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { useState, useCallback } from 'react'
import { stringify, parse } from 'devalue'
import { getToken } from 'next-auth/jwt'
import { useTranslations } from 'contexts/useTranslation'
import { Tabs } from 'components/Atoms'
import {
  GuildDataProvider,
  GuildDataConsumer,
  ServerSideGuildDataProps,
  Template,
  GuildHero,
  EditGuildDialog,
  MessageBoard,
  MemberList,
  ApplyList,
} from 'modules/BossHunting'
import { prisma } from 'lib/prisma'
import { buildPageTitle } from 'utils'
import { routes } from 'Constants'
import { common, bosses } from 'locales'

type GuildPageProps = {
  serializedGuildData: string
}

export default function GuildPage({ serializedGuildData }: GuildPageProps) {
  const { translations } = useTranslations()

  const [guildDataProps] = useState<ServerSideGuildDataProps>(
    parse(serializedGuildData),
  )

  const [isEditOpen, setIsEditOpen] = useState(false)
  const toggleEditDialog = useCallback(() => setIsEditOpen((prev) => !prev), [])

  /* @ ToDo: add title */
  /* const pageName = translations.bossTracker.Meta.title */
  const pageName = guildDataProps.guild.name
  /* const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: heroSrc,
  }) */

  const pageTitle = buildPageTitle(pageName)

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
        {/* <meta property="og:type" content="website" />

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
        /> */}
      </Head>

      <GuildDataProvider {...guildDataProps}>
        <Template>
          <GuildDataConsumer>
            {({
              isEditor,
              guild,
              memberCount,
              isMember,
              canManageApplications,
              setGuildData,
            }) => (
              <>
                <GuildHero guild={guild} memberCount={memberCount} />

                <div className="inner-container z-1 relative mx-auto grid max-w-full gap-8 sm:w-96 sm:px-0 md:w-[540px]">
                  {isEditOpen && <EditGuildDialog onClose={toggleEditDialog} />}

                  {/* @ ToDo: i18n */}
                  <MessageBoard
                    title="Description"
                    description={guild.description}
                    isEditor={isEditor}
                    addText="Add description"
                    editText="Edit description"
                    onEdit={toggleEditDialog}
                  />

                  {/* @ ToDo: i18n */}
                  <MessageBoard
                    title="Internal message board"
                    description={guild.messageBoard}
                    isEditor={isEditor}
                    addText="Add message"
                    editText="Edit message"
                    onEdit={toggleEditDialog}
                  />

                  {/* @ ToDo: i18n */}
                  <MemberList
                    title="Members"
                    guildName={guild.name}
                    members={guild.guildMembers}
                    isEditor={isEditor}
                  />

                  {/* @ ToDo: i18n */}
                  {isMember && (
                    <Tabs.Group>
                      <Tabs.Panel label="Group applications">
                        <ApplyList
                          list={guild.guildApplications}
                          allowAction={canManageApplications}
                          onAction={({ application, newMember }) =>
                            setGuildData((prev) => ({
                              ...prev,
                              guild: {
                                ...prev.guild,
                                guildApplications:
                                  prev.guild.guildApplications.filter(
                                    ({ id }) => id !== application.id,
                                  ),
                                guildMembers: newMember
                                  ? [...prev.guild.guildMembers, newMember]
                                  : prev.guild.guildMembers,
                              },
                            }))
                          }
                        />
                      </Tabs.Panel>
                      <Tabs.Panel label="Log history">das</Tabs.Panel>
                    </Tabs.Group>
                  )}
                </div>
              </>
            )}
          </GuildDataConsumer>
        </Template>
      </GuildDataProvider>
    </>
  )
}

const redirect: GetServerSidePropsResult<any> = {
  redirect: {
    destination: routes.BOSSES.HUNTING_GROUPS,
    permanent: false,
  },
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query: { guildName },
  locale,
}) => {
  const token = await getToken({ req })

  if (typeof guildName !== 'string') return redirect

  const guild = await prisma.guild.findUnique({
    where: { name: guildName },
    include: {
      guildMembers: { orderBy: { joinedAt: 'asc' } },
      guildApplications: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!guild) return redirect

  const { guildMembers } = guild

  const currentMember = guildMembers.find(({ userId }) => userId === token?.id)

  return {
    props: {
      serializedGuildData: stringify({
        currentMember,
        guild: {
          ...guild,
          guildMembers: !guild.private || currentMember ? guildMembers : [],
          messageBoard: currentMember ? guild.messageBoard : null,
          guildApplications: currentMember ? guild.guildApplications : [],
        } as typeof guild,
        memberCount: guildMembers.length,
      }),
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
        /* bossTracker: bossTracker[locale as RegisteredLocale], */
      },
      locale,
    },
  }
}
