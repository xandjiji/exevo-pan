import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { useState, useCallback } from 'react'
import { stringify, parse } from 'devalue'
import { getToken } from 'next-auth/jwt'
import { useTranslations } from 'contexts/useTranslation'
import { Tabs, Button } from 'components/Atoms'
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
} from 'modules/BossHunting'
import { PersonAddIcon } from 'assets/svgs'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { prisma } from 'lib/prisma'
import { buildPageTitle } from 'utils'
import { routes } from 'Constants'
import type { JWT } from 'next-auth/jwt'
import { common, bosses } from 'locales'

type GuildPageProps = {
  serializedGuildData: string
  serializedToken: string
}

export default function GuildPage({
  serializedGuildData,
  serializedToken,
}: GuildPageProps) {
  const { translations } = useTranslations()
  const session = useSession()
  const isAuthed = !!session.data

  const router = useRouter()

  const [guildDataProps] = useState<GuildData>(parse(serializedGuildData))
  const [token] = useState<JWT | null>(parse(serializedToken))

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isApplyOpen, setIsApplyOpen] = useState(false)
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
            }) => (
              <>
                <GuildHero guild={guild} memberCount={members.length} />

                <div className="inner-container z-1 relative mx-auto grid max-w-full gap-8 sm:w-96 sm:px-0 md:w-[540px]">
                  {isEditOpen && <EditGuildDialog onClose={toggleEditDialog} />}
                  {isApplyOpen && isAuthed && (
                    <ApplyDialog
                      defaultUserName={session.data.user.name}
                      guildId={guild.id}
                      guildName={guild.name}
                      onClose={() => setIsApplyOpen(false)}
                    />
                  )}

                  <div className="flex items-center justify-end gap-2">
                    {!isMember && (
                      <Button
                        className="flex items-center gap-2"
                        onClick={
                          isAuthed
                            ? () => setIsApplyOpen(true)
                            : () => router.push(routes.LOGIN)
                        }
                      >
                        <PersonAddIcon className="-ml-1" />
                        Apply
                      </Button>
                    )}
                  </div>

                  {/* @ ToDo: i18n */}
                  <MessageBoard
                    title="Description"
                    description={guild.description}
                    isEditor={isEditor || EXEVO_PAN_ADMIN}
                    addText="Add description"
                    editText="Edit description"
                    onEdit={toggleEditDialog}
                  />

                  {/* @ ToDo: i18n */}
                  {(isMember || EXEVO_PAN_ADMIN) && (
                    <MessageBoard
                      title="Internal message board"
                      description={guild.messageBoard}
                      isEditor={isEditor || EXEVO_PAN_ADMIN}
                      addText="Add message"
                      editText="Edit message"
                      onEdit={toggleEditDialog}
                    />
                  )}

                  {/* @ ToDo: i18n */}
                  <MemberList
                    title="Members"
                    guildName={guild.name}
                    members={members}
                    isEditor={isEditor || EXEVO_PAN_ADMIN}
                    currentMember={currentMember}
                    isPrivate={guild.private && !EXEVO_PAN_ADMIN}
                  />

                  {/* @ ToDo: i18n */}
                  {(isMember || EXEVO_PAN_ADMIN) && (
                    <Tabs.Group>
                      <Tabs.Panel label="Group applications">
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

  const guildData: GuildData = {
    guild: {
      ...rest,
      messageBoard: isMember || EXEVO_PAN_ADMIN ? messageBoard : null,
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
          }))
        : guildMembers,
    applications: isMember || EXEVO_PAN_ADMIN ? guildApplications : [],
  }

  return {
    props: {
      serializedGuildData: stringify(guildData),
      serializedToken: stringify(token),
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
        /* bossTracker: bossTracker[locale as RegisteredLocale], */
      },
      locale,
    },
  }
}
