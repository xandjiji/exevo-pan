import clsx from 'clsx'
import { useTranslations, templateString } from 'contexts/useTranslation'
import { useState, useMemo, useCallback } from 'react'
import { Input, Checkbox, Button } from 'components/Atoms'
import { sortBossesBy, MILLISECONDS_IN } from 'utils'
import { Menu } from 'components/Organisms'
import {
  MoreIcon,
  ExpandIcon,
  ViewedIcon,
  OutlineRemoveIcon,
  BlogIcon,
  UndoIcon,
  ChevronDownIcon,
} from 'assets/svgs'
import { useStoredState } from 'hooks'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { premiumBosses } from 'Constants'
import type { GuildMember } from '@prisma/client'
import type { TRPCRouteInputs } from 'pages/api/trpc/[trpc]'
import { useRecentlyUpdated } from './useRecentlyUpdated'
import { useTimeAgo } from './useTimeAgo'
import { BossCard, BossDialog } from '../../../components'
import { utils } from '../../../blacklist'
import { isFromSameServerSave, checkIfBoss } from './utils'

const INITIAL_DISPLAYED_COUNT = 4

type CheckedBossesProps = {
  guildId: string
  initialCheckedBosses: CheckedBoss[]
  currentMember?: GuildMember
  isAdmin?: boolean
  onNotify?: (args: { boss: string; location?: string }) => void
}

const prefixedLSKey = (key: string) => `boss-group-filter-${key}`

const CheckedBosses = ({
  guildId,
  initialCheckedBosses,
  currentMember,
  isAdmin = false,
  onNotify,
}: CheckedBossesProps) => {
  const {
    translations: { common, huntingGroups },
  } = useTranslations()
  const i18n = huntingGroups.CheckedBosses

  const isMember = isAdmin || !!currentMember

  const [expanded, setExpanded] = useState(false)

  const [selectedBoss, setSelectedBoss] = useState<string | undefined>()
  const [bossQuery, setBossQuery] = useState('')
  const [hideNoChance, setHideNoChance] = useStoredState(
    prefixedLSKey('no-chance'),
    false,
    isMember ? undefined : false,
  )
  const [hideRecentlyChecked, setHideRecentlyChecked] = useStoredState(
    prefixedLSKey('recently-checked'),
    false,
    isMember ? undefined : false,
  )
  const [hideBlacklisted, setHideBlacklisted] = useStoredState(
    prefixedLSKey('blacklisted'),
    false,
    isMember ? undefined : false,
  )
  const [hideRaidBosses, setHideRaidBosses] = useStoredState(
    prefixedLSKey('raid-bosses'),
    false,
    isMember ? undefined : false,
  )

  const checkedTimeAgo = useTimeAgo()
  const { recentlyUpdatedBosses, onFreshData } =
    useRecentlyUpdated(initialCheckedBosses)

  const checkedBosses = trpc.listCheckedBosses.useQuery(
    { guildId },
    {
      enabled: isMember,
      initialData: initialCheckedBosses,
      refetchInterval: MILLISECONDS_IN.MINUTE,
      onSuccess: onFreshData,
    },
  )

  const checkedList = checkedBosses.data

  const transformedList = useMemo(
    () =>
      checkedList.map((item) => {
        const manuallyMarkedAsNoChance = item.lastSpawned
          ? isFromSameServerSave(item.lastSpawned)
          : false

        return {
          ...item,
          lastChecked: checkedTimeAgo(item.checkedAt),
          currentChance: manuallyMarkedAsNoChance ? 0 : item.currentChance,
          manuallyMarkedAsNoChance,
        }
      }),
    [checkedList, checkedTimeAgo],
  )

  const blacklist = useMemo(
    () => utils.split(currentMember?.blacklistedBosses ?? ''),
    [currentMember],
  )

  const bossList = useMemo(
    () =>
      [...transformedList]
        .filter((boss) => {
          if (bossQuery && !boss.name.toLowerCase().includes(bossQuery)) {
            return false
          }

          if (hideRaidBosses && checkIfBoss.appearOnlyOnRaids(boss)) {
            return false
          }

          if (hideNoChance && checkIfBoss.hasNoChance(boss)) {
            return false
          }

          if (hideRecentlyChecked && boss.lastChecked?.recent) {
            return false
          }

          if (hideBlacklisted && blacklist.has(boss.name)) {
            return false
          }

          return true
        })
        .sort(sortBossesBy.chance)
        .slice(0, expanded ? transformedList.length : INITIAL_DISPLAYED_COUNT),
    [
      transformedList,
      bossQuery,
      hideNoChance,
      hideRecentlyChecked,
      hideBlacklisted,
      hideRaidBosses,
      blacklist,
      expanded,
    ],
  )

  const markCheckedBoss = trpc.markCheckedBoss.useMutation({
    onSuccess: () => checkedBosses.refetch(),
  })

  const markBoss = useCallback(
    ({
      boss,
      location,
      lastSpawned = null,
    }: Omit<TRPCRouteInputs['markCheckedBoss'], 'guildId'>) =>
      toast.promise(
        markCheckedBoss.mutateAsync({
          boss,
          guildId,
          location,
          lastSpawned,
        }),
        {
          success: templateString(i18n.bossWasMarked, {
            boss,
          }),
          error: common.genericError,
          loading: i18n.loading,
        },
      ),
    [common, i18n, markCheckedBoss],
  )

  return (
    <section>
      <h4 className="mb-4 text-xl">
        {i18n.checkedBosses}{' '}
        {checkedBosses.isFetching && (
          <div role="alert" className="loading-spinner ml-2 h-4 w-4" />
        )}
      </h4>

      <div className="my-4 flex flex-col gap-2 md:flex-row md:items-end md:gap-6">
        <Input
          allowClear
          label={i18n.search}
          placeholder="e.g. 'Yeti', 'Mr. Punish'"
          className="md:max-w-[200px]"
          onChange={(e) => setBossQuery(e.target.value.toLowerCase())}
          disabled={!isMember}
        />

        <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
          <Checkbox
            label={i18n.hideNoChance}
            checked={hideNoChance}
            onClick={() => setHideNoChance((prev) => !prev)}
            disabled={!isMember}
          />
          <Checkbox
            label={i18n.hideRaid}
            checked={hideRaidBosses}
            onClick={() => setHideRaidBosses((prev) => !prev)}
            disabled={!isMember}
          />
          <Checkbox
            label={i18n.hideRecentlyChecked}
            checked={hideRecentlyChecked}
            onClick={() => setHideRecentlyChecked((prev) => !prev)}
            disabled={!isMember}
          />
          <Checkbox
            label={i18n.hideBlacklisted}
            checked={hideBlacklisted}
            onClick={() => setHideBlacklisted((prev) => !prev)}
            disabled={!isMember}
          />
        </div>
      </div>

      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 md:grid-cols-2">
        {bossList.map((boss) => (
          <BossCard
            key={boss.name}
            bossStats={boss}
            location={boss.location}
            premium={premiumBosses.set.has(boss.name)}
            className={clsx(
              recentlyUpdatedBosses.has(boss.name) &&
                'animate-zoomInAndOut z-2 relative',
            )}
            cornerElement={
              <div className="ml-auto self-start">
                <Menu
                  offset={[0, 8]}
                  items={[
                    {
                      label: i18n.details,
                      icon: ExpandIcon,
                      onSelect: () => setSelectedBoss(boss.name),
                    },
                    {
                      label: i18n.notifyGroup,
                      icon: BlogIcon,
                      onSelect: () =>
                        onNotify?.({
                          boss: boss.name,
                          location: boss.location,
                        }),
                      disabled: boss.manuallyMarkedAsNoChance || !isMember,
                    },
                    {
                      label: boss.manuallyMarkedAsNoChance
                        ? i18n.unmarkAsNoChance
                        : i18n.markAsNoChance,
                      icon: boss.manuallyMarkedAsNoChance
                        ? UndoIcon
                        : OutlineRemoveIcon,
                      onSelect: () =>
                        markBoss({
                          boss: boss.name,
                          location: boss.location,
                          lastSpawned: boss.manuallyMarkedAsNoChance
                            ? null
                            : new Date(),
                        }),
                      disabled: !isMember,
                    },
                    {
                      label: i18n.markAsChecked,
                      icon: ViewedIcon,
                      onSelect: () =>
                        markBoss({ boss: boss.name, location: boss.location }),
                      disabled: boss.manuallyMarkedAsNoChance || !isMember,
                    },
                  ]}
                >
                  <MoreIcon className="fill-onSurface h-4 w-4" />
                </Menu>
              </div>
            }
            bottomElement={
              !isMember ? (
                <p
                  className="flex items-center gap-1"
                  title={templateString(i18n.lastTimeChecked, {
                    member: '??',
                  })}
                >
                  <ViewedIcon className="fill-primaryHighlight mr-0.5 h-4 w-4" />
                  <span>?? {i18n.minutesAgo}</span>
                </p>
              ) : boss.manuallyMarkedAsNoChance ? (
                <p
                  className="flex items-center gap-1"
                  title={templateString(i18n.lastTimeChecked, {
                    member: boss.checkedBy ?? '',
                  })}
                >
                  <OutlineRemoveIcon className="fill-red mr-0.5 h-4 w-4" />
                  {!!boss.lastChecked && (
                    <span>{boss.lastChecked.readable}</span>
                  )}
                </p>
              ) : boss.lastChecked ? (
                <p
                  className="flex items-center gap-1"
                  title={templateString(i18n.lastTimeChecked, {
                    member: boss.checkedBy ?? '',
                  })}
                >
                  <ViewedIcon
                    className={clsx(
                      'mr-0.5 h-4 w-4',
                      boss.lastChecked.recent ? 'fill-separator' : 'fill-red',
                    )}
                  />
                  <span>{boss.lastChecked.readable}</span>
                </p>
              ) : undefined
            }
          />
        ))}

        {!expanded && (
          <div
            role="none"
            className="to-background z-1 absolute -bottom-2 -left-1 h-24 w-[calc(100%+16px)] bg-gradient-to-b from-transparent"
          />
        )}
      </div>

      {!expanded && (
        <Button
          hollow
          pill
          className="mx-auto mt-4"
          onClick={() => setExpanded(true)}
          disabled={!isMember}
        >
          <ChevronDownIcon className={clsx(!isMember && '!fill-separator')} />
          {i18n.showMore}
        </Button>
      )}

      <BossDialog
        bossName={selectedBoss}
        onClose={useCallback(() => setSelectedBoss(undefined), [])}
      />
    </section>
  )
}

export default CheckedBosses
