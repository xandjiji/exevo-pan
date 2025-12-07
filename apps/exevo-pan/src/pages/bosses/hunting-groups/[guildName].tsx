import clsx from 'clsx'
import { db } from 'db'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { useCallback, useState } from 'react'
import { parse, stringify } from 'devalue'
import { getToken } from 'next-auth/jwt'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Alert, Button, Tabs, Text } from 'components/Atoms'
import { ConditionalClientComponent } from 'components/Organisms'
import {
  ApplyDialog,
  ApplyList,
  ChartedList,
  CheckedBosses,
  CheckHistory,
  EditGuildDialog,
  ExportDataDialog,
  GuildData,
  GuildDataConsumer,
  GuildDataProvider,
  GuildHero,
  HuntingGroupStatistics,
  LogHistory,
  MemberList,
  MessageBoard,
  NotificationDialog,
  SettingsDialog,
  Template,
} from 'modules/BossHunting'
import { BlogIcon, PersonAddIcon, SettingsIcon, UploadIcon } from 'assets/svgs'
import { PreviewImageClient } from 'services'
import { caller } from 'pages/api/trpc/[trpc]'
import { BossesClient } from 'services/server'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  buildPageTitle,
  buildUrl,
  getGuildPermalink,
  loadDisplayNameBossSrc,
  loadRawSrc,
} from 'utils'
import { exevoPro, jsonld, routes } from 'Constants'
import type { JWT } from 'next-auth/jwt'
import { bosses, common, huntingGroups } from 'locales'
import { useLocalizedHref } from 'hooks/useLocalizedHref'

const previewImageSrc = loadRawSrc('/huntingGroups.png')

type GuildPageProps = {
  serializedGuildData: string
  serializedToken: string
}

const getMonthNumber = (past: boolean) => {
  const currentDate = new Date()

  if (past) {
    currentDate.setMonth(currentDate.getMonth() - 1)
  }

  return currentDate.getMonth()
}

function EarnTC({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={useLocalizedHref(routes.DASHBOARD.REFERRALS)}
      className="text-primaryHighlight font-bold underline underline-offset-2"
    >
      {children}
    </a>
  )
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

  const [statisticsTabIndex, setStatisticsTabIndex] = useState(0)
  const currentStatistics = statisticsTabIndex !== 1
  const isExportDataOpen = statisticsTabIndex === 2

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

  // const isPro = !!session.data?.user.proStatus

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
              checkStatistics,
            }) => {
              const hasMemberPrivilege = isMember || EXEVO_PAN_ADMIN

              return (
                <>
                  <GuildHero guild={guild} memberCount={members.length} />

                  <div className="z-1 inner-container lgr:w-[1024px] relative mx-auto grid max-w-full gap-8 pb-8 sm:w-96 sm:px-0 md:w-[540px] lg:w-[768px]">
                    {isEditOpen && (
                      <EditGuildDialog onClose={toggleEditDialog} />
                    )}

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

                    {token?.proStatus && (
                      <Alert noIcon variant="primary">
                        {templateMessage(i18n.referralAlert, {
                          discount: (
                            <strong>
                              {exevoPro.referral.discountPercent}%
                            </strong>
                          ),
                          earnTc: (
                            <EarnTC>
                              {templateMessage(i18n.earnTc, {
                                commission: (
                                  <Text.TibiaCoin
                                    value={exevoPro.referral.tcCommission}
                                  />
                                ),
                              })}
                            </EarnTC>
                          ),
                        })}
                        !
                      </Alert>
                    )}

                    <div
                      className={clsx(
                        'grid gap-8',
                        hasMemberPrivilege && 'lgr:grid-cols-2',
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
                      {hasMemberPrivilege && (
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

                    <ConditionalClientComponent ssr={!hasMemberPrivilege}>
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

                    <section className="mx-auto w-full">
                      <h4 className="mb-4 text-xl">
                        {i18n.GroupStatistics.heading}
                      </h4>

                      <Tabs.Group
                        activeIndex={statisticsTabIndex}
                        onChange={setStatisticsTabIndex}
                      >
                        <Tabs.Panel
                          label={`${i18n.GroupStatistics.currentMonth} (${
                            translations.common.FullMonth[
                              getMonthNumber(
                                false,
                              ) as unknown as keyof typeof translations.common.FullMonth
                            ]
                          })`}
                        />
                        <Tabs.Panel
                          label={`${i18n.GroupStatistics.pastMonth} (${
                            translations.common.FullMonth[
                              getMonthNumber(
                                true,
                              ) as unknown as keyof typeof translations.common.FullMonth
                            ]
                          })`}
                        />

                        {guildDataProps.frozenBossCheckLogEntries.length >
                          0 && (
                          <Tabs.Panel
                            label={
                              <>
                                <UploadIcon /> {i18n.GroupStatistics.exportData}
                              </>
                            }
                          />
                        )}
                      </Tabs.Group>

                      {isExportDataOpen && (
                        <ExportDataDialog
                          frozenEntries={
                            guildDataProps.frozenBossCheckLogEntries
                          }
                          onClose={() => setStatisticsTabIndex(0)}
                        />
                      )}

                      <div
                        className={clsx(
                          'grid w-full gap-8 lg:grid-cols-2',
                          hasMemberPrivilege && 'lg:items-start',
                        )}
                      >
                        <ChartedList
                          heading={i18n.GroupStatistics.bosses}
                          subtitle={i18n.GroupStatistics.checksBy}
                          list={
                            checkStatistics[
                              currentStatistics ? 'currentMonth' : 'pastMonth'
                            ].boss
                          }
                          iconSrcResolver={loadDisplayNameBossSrc}
                          emptyMessage={i18n.GroupStatistics.emptyState.bosses}
                          mock={!hasMemberPrivilege}
                        />
                        <ChartedList
                          heading={i18n.GroupStatistics.members}
                          subtitle={i18n.GroupStatistics.checksBy}
                          list={
                            checkStatistics[
                              currentStatistics ? 'currentMonth' : 'pastMonth'
                            ].members
                          }
                          emptyMessage={i18n.GroupStatistics.emptyState.members}
                          mock={!hasMemberPrivilege}
                        />
                      </div>
                    </section>
                    <div
                      className={clsx(
                        'mx-auto grid w-full gap-8',
                        hasMemberPrivilege && 'lg:grid-cols-2 lg:items-start',
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
                      {hasMemberPrivilege && (
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
                          <Tabs.Panel label={i18n.checkHistory}>
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
              )
            }}
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

const getCheckedBosses = async ({
  hasMemberPrivilege,
  isPro,
  guildId,
  server,
}: {
  hasMemberPrivilege: boolean
  isPro: boolean
  guildId: string
  server: string
}): Promise<CheckedBoss[]> =>
  hasMemberPrivilege
    ? BossesClient.fetchCheckedBosses({
        isPro,
        guildId,
        server,
      })
    : BossesClient.fetchServerBossChances({
        server,
        isPro,
      }).then((bossChances) =>
        bossChances.bosses.map((stats) => ({ ...stats, location: '' })),
      )

const mockedBosses: HuntingGroupsStatisticsEntry[] = [
  {
    name: 'Ocyakao',
    count: 100,
    percentage: 50,
  },
  {
    name: 'The Welter',
    count: 67,
    percentage: 50,
  },
  {
    name: 'Man in the Cave',
    count: 25,
    percentage: 50,
  },
  {
    name: 'Yeti',
    count: 15,
    percentage: 50,
  },
]

const mockedMembers: HuntingGroupsStatisticsEntry[] = [
  { name: '??????? ????????', count: 100, percentage: 50 },
  { name: '????? ?????', count: 67, percentage: 50 },
  { name: '???????', count: 35, percentage: 50 },
  { name: '?? ???????', count: 30, percentage: 50 },
  { name: '???', count: 17, percentage: 50 },
  { name: '?????', count: 14, percentage: 50 },
  { name: '???????', count: 5, percentage: 50 },
  { name: '?????', count: 5, percentage: 50 },
]

const getCheckStatistics = async ({
  guildId,
  hasMemberPrivilege,
}: {
  hasMemberPrivilege: boolean
  guildId: string
}): Promise<HuntingGroupStatistics> =>
  hasMemberPrivilege
    ? caller.getCheckStats({ guildId })
    : {
        currentMonth: { boss: mockedBosses, members: mockedMembers },
        pastMonth: { boss: mockedBosses, members: mockedMembers },
      }

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query: { guildName },
  locale,
}) => {
  const token = await getToken({ req })
  const EXEVO_PAN_ADMIN = token?.role === 'ADMIN'

  if (typeof guildName !== 'string') return redirect

  const guild = await db
    .selectFrom('Guild')
    .selectAll()
    .where('name', '=', guildName)
    .executeTakeFirst()

  if (!guild) return redirect

  const [guildMembers, guildApplications] = await Promise.all([
    db
      .selectFrom('GuildMember')
      .selectAll()
      .where('guildId', '=', guild.id)
      .orderBy('joinedAt', 'asc')
      .execute(),
    db
      .selectFrom('GuildApplication')
      .selectAll()
      .where('guildId', '=', guild.id)
      .orderBy('createdAt', 'desc')
      .execute(),
  ])

  const isMember = guildMembers.some(({ userId }) => userId === token?.id)
  const hasMemberPrivilege = isMember || EXEVO_PAN_ADMIN
  const isPro = token?.proStatus ?? false

  const [checkedBosses, checkStatistics, frozenBossCheckLogEntries] =
    await Promise.all([
      getCheckedBosses({
        hasMemberPrivilege,
        isPro,
        guildId: guild.id,
        server: guild.server,
      }),
      getCheckStatistics({ hasMemberPrivilege, guildId: guild.id }),
      BossesClient.fetchAllFrozenBossCheckLogEntries({
        guildId: guild.id,
        hasMemberPrivilege,
      }),
    ])

  const guildData: GuildData = {
    guild: {
      id: guild.id,
      private: guild.private,
      name: guild.name,
      server: guild.server,
      avatarId: guild.avatarId,
      createdAt: guild.createdAt,
      description: guild.description,
      avatarDegree: guild.avatarDegree,
      eventEndpoint: guild.eventEndpoint,
      messageBoard: hasMemberPrivilege ? guild.messageBoard : null,
    },
    members:
      guild.private && !hasMemberPrivilege
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
    checkStatistics,
    frozenBossCheckLogEntries,
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
