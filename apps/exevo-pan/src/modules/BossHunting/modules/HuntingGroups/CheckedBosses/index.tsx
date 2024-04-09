import clsx from 'clsx'
import {
  templateMessage,
  templateString,
  useTranslations,
} from 'contexts/useTranslation'
import { useCallback, useMemo, useState } from 'react'
import { Button, Checkbox, Input } from 'components/Atoms'
import { MILLISECONDS_IN, sortBossesBy } from 'utils'
import { Menu, Tooltip } from 'components/Organisms'
import {
  BlogIcon,
  ChevronDownIcon,
  ExpandIcon,
  MoreIcon,
  OutlineRemoveIcon,
  UndoIcon,
  ViewedIcon,
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
import { can } from '../../../../../server/guild/permissions'
import { BossTooltipContent, TooltipList } from './atoms'
import {
  checkIfBoss,
  isFromSameServerSave,
  raidBossesNames,
  sharedSpawnBossesNames,
} from './utils'

const INITIAL_DISPLAYED_COUNT = 6

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
  const { common, huntingGroups } = useTranslations()
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
  const [hideForcedBosses, setHideForcedBosses] = useStoredState(
    prefixedLSKey('forced-bosses'),
    false,
    isMember ? undefined : false,
  )

  const checkedTimeAgo = useTimeAgo()
  const { lastPull, checkedBosses, onFreshData, onBossCheck } =
    useRecentlyUpdated(initialCheckedBosses)

  const pullChecks = trpc.updateCheckedBosses.useQuery(
    { guildId, checkedAt: lastPull },
    {
      enabled: isMember,
      initialData: initialCheckedBosses,
      refetchOnWindowFocus: true,
      refetchInterval: MILLISECONDS_IN.MINUTE,
      onSuccess: onFreshData,
    },
  )

  const transformedList = useMemo(
    () =>
      checkedBosses.map((item) => {
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
    [checkedBosses, checkedTimeAgo],
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

          if (hideForcedBosses && checkIfBoss.isSharedSpawn(boss)) {
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
      hideForcedBosses,
      hideRaidBosses,
      blacklist,
      expanded,
    ],
  )

  const [loadingBossCheck, setLoadingBossCheck] =
    useState<{ boss: string; location: string }>()
  const markCheckedBoss = trpc.markCheckedBoss.useMutation({
    onMutate: ({ boss, location }) => onBossCheck({ bossName: boss, location }),
    onSettled: () => setLoadingBossCheck(undefined),
  })

  const markBoss = useCallback(
    ({
      boss,
      location,
      lastSpawned = null,
    }: Omit<TRPCRouteInputs['markCheckedBoss'], 'guildId'>) => {
      setLoadingBossCheck({ boss, location: location ?? '' })
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
      )
    },
    [common, i18n, markCheckedBoss],
  )

  return (
    <section>
      <h4 className="mb-4 text-xl">
        {i18n.checkedBosses}{' '}
        {pullChecks.isFetching && (
          <div role="alert" className="loading-spinner ml-2 h-4 w-4" />
        )}
      </h4>

      <div className="my-4 flex flex-col gap-2 md:flex-row md:items-start md:gap-6 lg:items-end">
        <Input
          allowClear
          label={i18n.search}
          placeholder="e.g. 'Yeti', 'Mr. Punish'"
          className="md:max-w-[200px]"
          onChange={(e) => setBossQuery(e.target.value.toLowerCase())}
          disabled={!isMember}
        />

        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-x-3 lg:grid-cols-3 lg:gap-x-4">
          <Checkbox
            label={i18n.hideNoChance}
            checked={hideNoChance}
            onClick={() => setHideNoChance((prev) => !prev)}
            disabled={!isMember}
          />
          <Checkbox
            label={
              <div>
                {templateMessage(i18n.hideRaid, {
                  bosses: (
                    <Tooltip
                      content={<TooltipList list={raidBossesNames} />}
                      offset={[0, 8]}
                    >
                      <BossTooltipContent />
                    </Tooltip>
                  ),
                })}
              </div>
            }
            checked={hideRaidBosses}
            onClick={() => setHideRaidBosses((prev) => !prev)}
            disabled={!isMember}
          />
          <Checkbox
            label={
              <div>
                {templateMessage(i18n.hideSharedSpawn, {
                  bosses: (
                    <Tooltip
                      content={<TooltipList list={sharedSpawnBossesNames} />}
                      offset={[0, 8]}
                    >
                      <BossTooltipContent />
                    </Tooltip>
                  ),
                })}
              </div>
            }
            checked={hideForcedBosses}
            onClick={() => setHideForcedBosses((prev) => !prev)}
            disabled={!isMember}
          />
          <Checkbox
            label={i18n.hideBlacklisted}
            checked={hideBlacklisted}
            onClick={() => setHideBlacklisted((prev) => !prev)}
            disabled={!isMember}
          />
          <Checkbox
            label={i18n.hideRecentlyChecked}
            checked={hideRecentlyChecked}
            onClick={() => setHideRecentlyChecked((prev) => !prev)}
            disabled={!isMember}
          />
        </div>
      </div>

      <div className="lgr:grid-cols-3 relative grid gap-3 md:grid-cols-2">
        {bossList.map((boss, idx) => {
          const {
            name,
            location,
            manuallyMarkedAsNoChance,
            lastChecked,
            checkedBy,
            checkedAt,
          } = boss

          const checkAction = () => markBoss({ boss: name, location })
          const checkIsLoading = loadingBossCheck
            ? loadingBossCheck.boss === name &&
              loadingBossCheck.location === location
            : false
          const disableCheck =
            manuallyMarkedAsNoChance || !isMember || checkIsLoading

          return (
            <BossCard
              key={name}
              bossStats={boss}
              location={location}
              premium={premiumBosses.set.has(name)}
              className={clsx(
                !expanded && idx > 3 && 'lgr:flex hidden',
                boss.fresh && 'animate-zoomInAndOut z-2 relative',
              )}
              cornerElement={
                <div className="ml-auto flex h-full flex-col items-end justify-between self-start">
                  <Menu
                    offset={[0, 8]}
                    items={[
                      {
                        label: i18n.details,
                        icon: ExpandIcon,
                        onSelect: () => setSelectedBoss(name),
                      },
                      {
                        label: i18n.notifyGroup,
                        icon: BlogIcon,
                        onSelect: () => onNotify?.({ boss: name, location }),
                        disabled: manuallyMarkedAsNoChance || !isMember,
                      },
                      {
                        label: manuallyMarkedAsNoChance
                          ? i18n.unmarkAsNoChance
                          : i18n.markAsNoChance,
                        icon: manuallyMarkedAsNoChance
                          ? UndoIcon
                          : OutlineRemoveIcon,
                        onSelect: () =>
                          markBoss({
                            boss: name,
                            location,
                            lastSpawned: manuallyMarkedAsNoChance
                              ? null
                              : new Date(),
                          }),
                        disabled:
                          !currentMember ||
                          !can[currentMember.role].markAsNoChance,
                      },
                      {
                        label: i18n.markAsChecked,
                        icon: ViewedIcon,
                        onSelect: checkAction,
                        disabled: disableCheck,
                      },
                    ]}
                  >
                    <MoreIcon className="fill-onSurface h-4 w-4" />
                  </Menu>

                  <Button
                    pill
                    onClick={checkAction}
                    disabled={disableCheck}
                    loading={checkIsLoading}
                    aria-label={i18n.markAsChecked}
                  >
                    Check
                  </Button>
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
                ) : manuallyMarkedAsNoChance ? (
                  <p
                    className="flex items-center gap-1"
                    title={templateString(i18n.lastTimeChecked, {
                      member: checkedBy ?? '',
                    })}
                  >
                    <OutlineRemoveIcon className="fill-red mr-0.5 h-4 w-4" />
                    {!!lastChecked && <span>{lastChecked.readable}</span>}
                  </p>
                ) : lastChecked ? (
                  <p
                    className="flex items-center gap-1"
                    title={templateString(i18n.fullLastTimeChecked, {
                      time: checkedAt
                        ? checkedAt.toLocaleString('pt-BR', { hour12: false })
                        : lastChecked.readable,
                      member: checkedBy ?? '',
                    })}
                  >
                    <ViewedIcon
                      className={clsx(
                        'mr-0.5 h-4 w-4',
                        lastChecked.recent ? 'fill-separator' : 'fill-red',
                      )}
                    />
                    <span>{lastChecked.readable}</span>
                  </p>
                ) : undefined
              }
            />
          )
        })}

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
          <ChevronDownIcon
            className={clsx('h-6 w-6', !isMember && '!fill-separator')}
          />
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
