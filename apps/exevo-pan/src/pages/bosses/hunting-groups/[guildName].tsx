import clsx from 'clsx'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { useState, useCallback } from 'react'
import { stringify, parse } from 'devalue'
import { getToken } from 'next-auth/jwt'
import { useTranslations } from 'contexts/useTranslation'
import { Tabs, Button } from 'components/Atoms'
import { ConditionalClientComponent } from 'components/Organisms'
import {
  GuildDataProvider,
  GuildDataConsumer,
  GuildData,
  Template,
  GuildHero,
  ApplyDialog,
  EditGuildDialog,
  MessageBoard,
  MemberList,
  ApplyList,
  NotificationDialog,
  SettingsDialog,
  CheckHistory,
  LogHistory,
  CheckedBosses,
} from 'modules/BossHunting'
import { SettingsIcon, BlogIcon, PersonAddIcon } from 'assets/svgs'
import { PreviewImageClient } from 'services'
import { BossesClient } from 'services/server'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { prisma } from 'lib/prisma'
import { buildPageTitle, loadRawSrc, getGuildPermalink, buildUrl } from 'utils'
import { routes, jsonld } from 'Constants'
import type { JWT } from 'next-auth/jwt'
import { common, bosses, huntingGroups } from 'locales'

const previewImageSrc = loadRawSrc('/huntingGroups.png')

type GuildPageProps = {
  serializedGuildData: string
  serializedToken: string
}

export default function GuildPage({
  serializedGuildData,
  serializedToken,
}: GuildPageProps) {
  const translations = useTranslations()
  const i18n = translations.huntingGroups
  const session = useSession()
  const isAuthed = !!session.data

  const router = useRouter()

  const [guildDataProps] = useState<GuildData>(parse(serializedGuildData))
  const [token] = useState<JWT | null>(parse(serializedToken))

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isApplyOpen, setIsApplyOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState<{
    isOpen: boolean
    defaultBoss?: string
    location?: string
  }>({ isOpen: false })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const toggleEditDialog = useCallback(() => setIsEditOpen((prev) => !prev), [])

  const pageName = guildDataProps.guild.name
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: previewImageSrc,
  })

  const pageTitle = buildPageTitle(pageName)

  const metaDescription = guildDataProps.guild.description
    ? guildDataProps.guild.description
    : translations.huntingGroups.Meta.description

  const absolutePageUrl = getGuildPermalink(guildDataProps.guild.name, true)
  const pagePath = getGuildPermalink(guildDataProps.guild.name)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta name="description" content={metaDescription} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="canonical" href={absolutePageUrl} />
        <meta property="og:url" content={absolutePageUrl} />
        <meta property="twitter:url" content={absolutePageUrl} />

        <link rel="alternate" hrefLang="en" href={absolutePageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(pagePath, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(pagePath, 'es')} />
        <link rel="alternate" hrefLang="pl" href={buildUrl(pagePath, 'pl')} />
        <link rel="alternate" hrefLang="x-default" href={absolutePageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <GuildDataProvider {...guildDataProps} token={token}>
        <Template>
          <GuildDataConsumer>
            {({
              EXEVO_PAN_ADMIN,
              guild,
              members,
              applications,
              currentMember,
              isMember,
              isEditor,
              isApprover,
              setGuildData,
              checkedBosses,
            }) => (
              <>
                <GuildHero guild={guild} memberCount={members.length} />

                <div className="z-1 inner-container lgr:w-[1024px] relative mx-auto grid max-w-full gap-8 pb-8 sm:w-96 sm:px-0 md:w-[540px] lg:w-[768px]">
                  {isEditOpen && <EditGuildDialog onClose={toggleEditDialog} />}

                  <div className="child:ml-auto md:child:ml-0 grid items-center gap-4 md:flex md:justify-end md:gap-6">
                    {(isEditor || EXEVO_PAN_ADMIN) && (
                      <Button
                        hollow
                        pill
                        className="flex items-center gap-2"
                        onClick={toggleEditDialog}
                      >
                        <SettingsIcon className="h-4 w-4" />
                        {i18n.groupSettings}
                      </Button>
                    )}

                    {isMember && (
                      <>
                        <Button
                          hollow
                          pill
                          className="flex items-center gap-2"
                          onClick={() => setIsSettingsOpen(true)}
                        >
                          <SettingsIcon className="h-4 w-4" />
                          {i18n.mySettings}
                        </Button>
                        {isSettingsOpen && !!currentMember && (
                          <SettingsDialog
                            onClose={() => setIsSettingsOpen(false)}
                            currentMember={currentMember}
                            onMemberUpdate={(updatedCurrentMember) =>
                              setGuildData({
                                members: members.map((member) =>
                                  member.id === updatedCurrentMember.id
                                    ? updatedCurrentMember
                                    : member,
                                ),
                              })
                            }
                          />
                        )}
                      </>
                    )}

                    {isMember && (
                      <>
                        <Button
                          className="flex items-center gap-2"
                          onClick={() =>
                            setIsNotificationOpen({ isOpen: true })
                          }
                        >
                          <BlogIcon className="-ml-1 h-6 w-6" />
                          {i18n.notificate}
                        </Button>
                        {isNotificationOpen.isOpen && (
                          <NotificationDialog
                            guildId={guild.id}
                            defaultBoss={isNotificationOpen.defaultBoss}
                            location={isNotificationOpen.location}
                            onClose={() =>
                              setIsNotificationOpen({ isOpen: false })
                            }
                          />
                        )}
                      </>
                    )}

                    {!isMember && (
                      <>
                        <Button
                          className="flex items-center gap-2"
                          onClick={
                            isAuthed
                              ? () => setIsApplyOpen(true)
                              : () => router.push(routes.LOGIN)
                          }
                        >
                          <PersonAddIcon className="-ml-1 h-6 w-6" />
                          {i18n.apply}
                        </Button>
                        {isApplyOpen && isAuthed && (
                          <ApplyDialog
                            defaultUserName={session.data.user.name}
                            guildId={guild.id}
                            guildName={guild.name}
                            onClose={() => setIsApplyOpen(false)}
                          />
                        )}
                      </>
                    )}
                  </div>

                  <div
                    className={clsx(
                      'grid gap-8',
                      (isMember || EXEVO_PAN_ADMIN) && 'lgr:grid-cols-2',
                    )}
                  >
                    <MessageBoard
                      title={i18n.publicBoard.title}
                      description={guild.description}
                      isEditor={isEditor || EXEVO_PAN_ADMIN}
                      addText={i18n.publicBoard.add}
                      editText={i18n.publicBoard.edit}
                      onEdit={toggleEditDialog}
                    />
                    {(isMember || EXEVO_PAN_ADMIN) && (
                      <MessageBoard
                        title={i18n.privateBoard.title}
                        description={guild.messageBoard}
                        isEditor={isEditor || EXEVO_PAN_ADMIN}
                        addText={i18n.privateBoard.add}
                        editText={i18n.privateBoard.edit}
                        onEdit={toggleEditDialog}
                      />
                    )}
                  </div>

                  <ConditionalClientComponent
                    ssr={!EXEVO_PAN_ADMIN && !currentMember}
                  >
                    <CheckedBosses
                      guildId={guild.id}
                      initialCheckedBosses={checkedBosses}
                      currentMember={currentMember}
                      isAdmin={EXEVO_PAN_ADMIN}
                      onNotify={({ boss, location }) =>
                        setIsNotificationOpen({
                          isOpen: true,
                          defaultBoss: boss,
                          location,
                        })
                      }
                    />
                  </ConditionalClientComponent>

                  <div
                    className={clsx(
                      'mx-auto grid w-full gap-8',
                      (isMember || EXEVO_PAN_ADMIN) &&
                        'lg:grid-cols-2 lg:items-start',
                    )}
                  >
                    <MemberList
                      title={i18n.members}
                      guildName={guild.name}
                      members={members}
                      isEditor={isEditor || EXEVO_PAN_ADMIN}
                      currentMember={currentMember}
                      isPrivate={guild.private && !EXEVO_PAN_ADMIN}
                    />
                    {(isMember || EXEVO_PAN_ADMIN) && (
                      <Tabs.Group>
                        <Tabs.Panel label={i18n.groupApplications}>
                          <ApplyList
                            list={applications}
                            allowAction={isApprover || EXEVO_PAN_ADMIN}
                            onAction={({ application, newMember }) =>
                              setGuildData((prev) => ({
                                applications: prev.applications.filter(
                                  ({ id }) => id !== application.id,
                                ),
                                members: newMember
                                  ? [...prev.members, newMember]
                                  : prev.members,
                              }))
                            }
                          />
                        </Tabs.Panel>
                        {/* @ ToDo: i18n */}
                        <Tabs.Panel label="Check history">
                          <CheckHistory guildId={guild.id} />
                        </Tabs.Panel>
                        <Tabs.Panel label={i18n.logHistory}>
                          <LogHistory guildId={guild.id} />
                        </Tabs.Panel>
                      </Tabs.Group>
                    )}
                  </div>
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
  const EXEVO_PAN_ADMIN = token?.role === 'ADMIN'

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

  const { guildMembers, guildApplications, messageBoard, ...rest } = guild

  const isMember = guildMembers.some(({ userId }) => userId === token?.id)
  const hasMemberPrivilege = isMember || EXEVO_PAN_ADMIN
  const isPro = token?.proStatus ?? false

  const checkedBosses: CheckedBoss[] = hasMemberPrivilege
    ? await BossesClient.fetchCheckedBosses({
        isPro,
        guildId: guild.id,
        server: guild.server,
      })
    : await BossesClient.fetchServerBossChances({
        server: guild.server,
        isPro,
      }).then((bossChances) =>
        bossChances.bosses.map((stats) => ({ ...stats, location: '' })),
      )

  const guildData: GuildData = {
    guild: {
      ...rest,
      messageBoard: hasMemberPrivilege ? messageBoard : null,
    },
    members:
      guild.private && !isMember && !EXEVO_PAN_ADMIN
        ? guildMembers.map(() => ({
            id: '',
            guildId: '',
            userId: '',
            joinedAt: new Date(),
            name: '',
            role: 'USER',
            disabledNotifications: false,
            blacklistedBosses: '',
          }))
        : guildMembers,
    applications: hasMemberPrivilege ? guildApplications : [],
    checkedBosses,
  }

  return {
    props: {
      serializedGuildData: stringify(guildData),
      serializedToken: stringify(token),
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
        huntingGroups: huntingGroups[locale as RegisteredLocale],
      },
      locale,
    },
  }
}
