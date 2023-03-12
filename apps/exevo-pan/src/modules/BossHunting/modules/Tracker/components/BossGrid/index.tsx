import clsx from 'clsx'
import { useState, useMemo, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { trpc } from 'lib/trpc'
import NextLink from 'next/link'
import EmptyState from 'components/EmptyState'
import { ChipGroup } from 'components/Organisms'
import { PinIcon } from 'assets/svgs'
import { routes, premiumBosses } from 'Constants'
import { BossCard } from '../../../../components'
import usePinBoss from './usePinBoss'
import { listBy, prioritizePremium } from './utils'
import BossDialog from '../BossDialog'
import { BossGridProps, ListOption } from './types'

const BossGrid = ({ bosses, server, className, ...props }: BossGridProps) => {
  const { translations } = useTranslations()

  const { data } = useSession()
  const isPro = data?.user.proStatus ?? false

  const [premiumBossData, setPremiumBossData] = useState<BossStats[]>([])

  trpc.proBosses.useQuery(
    { server },
    {
      refetchOnWindowFocus: false,
      enabled: isPro,
      onSuccess: setPremiumBossData,
      onError: () => setPremiumBossData([]),
    },
  )

  const hydratedBossList = useMemo(
    () =>
      bosses.map(
        (freeData) =>
          premiumBossData.find(({ name }) => name === freeData.name) ??
          freeData,
      ),
    [bosses, premiumBossData],
  )

  const [listingOption, setListingOption] = useState<ListOption>('chance')
  const list: typeof bosses = useMemo(
    () => prioritizePremium(listBy[listingOption](hydratedBossList)),
    [hydratedBossList, listingOption],
  )

  const listOptions: TypedOption<ListOption>[] = [
    {
      name: `🍀 ${translations.bossTracker.BossGrid.listOptions.chance}`,
      value: 'chance',
    },
    {
      name: `✓ ${translations.bossTracker.BossGrid.listOptions.lastSeen}`,
      value: 'recent',
    },
    { name: '️‍🔥 PoI', value: 'POI' },
    { name: '🧛🏻 Vampire Lord Tokens', value: 'vampires' },
    { name: '☠️ Archdemons', value: 'archdemons' },
    { name: '🐥 Rookgaard', value: 'rook' },
    {
      name: `📌 ${translations.bossTracker.BossGrid.listOptions.favorites}`,
      value: 'pinned',
    },
  ]

  const [pinnedBosses, toggleBoss] = usePinBoss()

  const listNotEmpty = list.length > 0

  const [selectedBoss, setSelectedBoss] = useState<string | undefined>()

  return (
    <section className={clsx('flex flex-col gap-4', className)} {...props}>
      <div className="bg-background z-above-tooltip sticky top-[104px] py-3 md:pt-5">
        <ChipGroup
          label={translations.bossTracker.BossGrid.listBosses}
          options={listOptions}
          value={listingOption}
          onChange={(e) => setListingOption(e.target.value as ListOption)}
        />
        <div
          role="none"
          className="z-2 from-background pointer-events-none absolute top-full -left-2 h-6 w-[calc(100%_+_16px)] bg-gradient-to-b to-transparent"
        />
        <div
          role="none"
          className="-z-1 bg-background absolute top-0 -left-2 h-full w-[calc(100%_+_16px)]"
        />
      </div>

      <p className="text-tsm">
        {templateMessage(translations.bossTracker.BossGrid.exclusiveBosses, {
          exevopro: (
            <NextLink href={routes.EXEVOPRO} className="text-rare font-bold">
              Exevo Pro
            </NextLink>
          ),
        })}
      </p>
      {listNotEmpty ? (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
          {list.map((bossStats) => {
            const isPinned = pinnedBosses.includes(bossStats.name)

            return (
              <BossCard
                key={bossStats.name}
                premium={premiumBosses.set.has(bossStats.name)}
                bossStats={bossStats}
                actionLabel={
                  translations.bossTracker.BossGrid[isPinned ? 'unpin' : 'pin']
                }
                actionIcon={
                  <PinIcon
                    className={clsx(
                      'h-4 w-4 transition-all',
                      isPinned ? 'fill-primaryHighlight' : 'fill-separator',
                    )}
                    style={{ rotate: isPinned ? 'unset' : '45deg' }}
                  />
                }
                action={toggleBoss}
                onClick={() => setSelectedBoss(bossStats.name)}
              />
            )
          })}
        </ul>
      ) : (
        <EmptyState
          className="mx-auto mt-8 w-40 md:mt-32"
          variant="large"
          nowrap
          text={translations.bossTracker.BossGrid.EmptyState}
        />
      )}

      <BossDialog
        bossName={selectedBoss}
        onClose={useCallback(() => setSelectedBoss(undefined), [])}
      />
    </section>
  )
}

export default BossGrid
