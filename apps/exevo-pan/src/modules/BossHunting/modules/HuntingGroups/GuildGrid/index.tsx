import { useState, useMemo } from 'react'
import { Tabs, Input, Paginator, LoadingAlert } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'contexts/useTranslation'
import { trpc } from 'lib/trpc'
import { debounce } from 'utils'
import { routes } from 'Constants'
import GuildList from './GuildList'
import { ApplyDialog } from '../components'
import { GuildGridProps } from './types'

export const PAGE_SIZE = 20
const DEBOUNCE_DELAY = 700

const INITIAL_QUERY = {
  pageIndex: 0,
  pageSize: PAGE_SIZE,
  name: '',
  server: '',
  myGuilds: false,
}

const EMPTY_GUILD_APPLICATION = { guildId: '', guildName: '' }

const GuildGrid = ({ initialGuildList, serverOptions }: GuildGridProps) => {
  const {
    translations: { common, huntingGroups },
  } = useTranslations()
  const i18n = huntingGroups.GuildGrid

  const router = useRouter()

  const { status, data } = useSession()
  const isAuthed = status === 'authenticated'

  const [query, setQuery] = useState(INITIAL_QUERY)

  const guildList = trpc.listGuilds.useQuery(query, {
    enabled: query !== INITIAL_QUERY,
    staleTime: 5000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    placeholderData: initialGuildList,
    select: (result) => ({
      ...result,
      displayApplyButton: !query.myGuilds,
    }),
  })

  const [applyGuildProps, setApplyGuildProps] = useState(
    EMPTY_GUILD_APPLICATION,
  )

  return (
    <section className="grid gap-4">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="grid w-full grid-cols-2 gap-4 sm:max-w-[380px]">
          <Input
            label={i18n.searchName}
            placeholder={i18n.searchPlaceholder}
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
            label={i18n.server}
            options={serverOptions}
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
      <Tabs.Group
        className="-mb-2"
        onChange={(newIndex) => {
          setQuery((prev) => ({ ...prev, myGuilds: newIndex === 1 }))
        }}
      >
        <Tabs.Panel label={i18n.findGroups} />
        {isAuthed && <Tabs.Panel label={i18n.myGroups} />}
      </Tabs.Group>
      <GuildList
        list={guildList.data?.page ?? []}
        onApply={
          guildList.data?.displayApplyButton
            ? isAuthed
              ? (guild) =>
                  setApplyGuildProps({
                    guildId: guild.id,
                    guildName: guild.name,
                  })
              : () => router.push(routes.LOGIN)
            : undefined
        }
      />

      {applyGuildProps.guildId.length > 0 && (
        <ApplyDialog
          {...applyGuildProps}
          defaultUserName={data?.user.name ?? ''}
          onClose={() => setApplyGuildProps(EMPTY_GUILD_APPLICATION)}
        />
      )}

      {guildList.isFetching && (
        <LoadingAlert>{common.LoadingLabel}</LoadingAlert>
      )}
    </section>
  )
}

export default GuildGrid
