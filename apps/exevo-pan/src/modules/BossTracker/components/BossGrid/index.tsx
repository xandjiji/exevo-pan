import clsx from 'clsx'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import EmptyState from 'components/EmptyState'
import { ChipGroup } from 'components/Organisms'
import { endpoints, routes } from 'Constants'
import usePinBoss from './usePinBoss'
import { listBy } from './utils'
import BossCard from './BossCard'
import BossDialog from '../BossDialog'
import { fallbackPremiumBosses, premiumBossSet } from './constants'
import { BossGridProps, ListOption } from './types'

const BossGrid = ({ bosses, server, className, ...props }: BossGridProps) => {
  const { translations } = useTranslations()

  const { data } = useSession()
  const isPro = data?.user.proStatus ?? false

  const [premiumBosses, setPremiumBosses] = useState<BossStats[]>([])
  useEffect(() => {
    if (isPro) {
      setPremiumBosses([])
      fetch(`${endpoints.PREMIUM_BOSSES}?server=${server}`)
        .then((res) => res.json().then(setPremiumBosses))
        .catch(() => setPremiumBosses(fallbackPremiumBosses))
    }
  }, [isPro, server])

  const bossList = useMemo(
    () => [...premiumBosses, ...bosses],
    [premiumBosses, bosses],
  )

  const [listingOption, setListingOption] = useState<ListOption>('chance')
  const list: typeof bosses = useMemo(() => {
    const sortedBosses = listBy[listingOption](bossList)

    return isPro ? sortedBosses : [...fallbackPremiumBosses, ...sortedBosses]
  }, [isPro, bossList, listingOption])

  const listOptions: TypedOption<ListOption>[] = [
    {
      name: `🍀 ${translations.bosses.BossGrid.listOptions.chance}`,
      value: 'chance',
    },
    {
      name: `✓ ${translations.bosses.BossGrid.listOptions.lastSeen}`,
      value: 'recent',
    },
    { name: '️‍🔥 PoI', value: 'POI' },
    { name: '🧛🏻 Vampire Lord Tokens', value: 'vampires' },
    { name: '☠️ Archdemons', value: 'archdemons' },
    { name: '🐥 Rookgaard', value: 'rook' },
    {
      name: `📌 ${translations.bosses.BossGrid.listOptions.favorites}`,
      value: 'pinned',
    },
  ]

  const [pinnedBosses, toggleBoss] = usePinBoss()

  const listNotEmpty = list.length > 0

  const [selectedBoss, setSelectedBoss] = useState<string | undefined>()

  return (
    <section className={clsx('flex flex-col gap-4', className)} {...props}>
      <div className="bg-background z-above-tooltip after:bg-background after:-z-1 sticky top-[120px] -mb-3 -mt-6 pb-3 pt-6 after:absolute after:-left-2 after:top-0 after:h-full after:w-[calc(100%_+_16px)]">
        <ChipGroup
          label={translations.bosses.BossGrid.listBosses}
          options={listOptions}
          value={listingOption}
          onChange={(e) => setListingOption(e.target.value as ListOption)}
        />
        <div
          role="none"
          className="z-2 from-background pointer-events-none absolute -bottom-4 -left-2 h-6 w-[calc(100%_+_16px)] bg-gradient-to-b to-transparent"
        />
      </div>

      {!isPro && (
        <p className="text-tsm mt-2">
          {translations.bosses.BossGrid.exclusiveBosses}{' '}
          <NextLink href={routes.DASHBOARD} className="text-rare font-bold">
            Exevo Pro
          </NextLink>{' '}
          🕵️
        </p>
      )}
      {listNotEmpty ? (
        <ul
          className={clsx(
            'grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3',
            isPro && 'pt-4',
          )}
        >
          {list.map((bossStats) => (
            <BossCard
              key={bossStats.name}
              premium={premiumBossSet.has(bossStats.name)}
              bossStats={bossStats}
              pinned={pinnedBosses.includes(bossStats.name)}
              onPin={toggleBoss}
              onClick={() => setSelectedBoss(bossStats.name)}
            />
          ))}
        </ul>
      ) : (
        <EmptyState
          text={{ content: translations.bosses.BossGrid.EmptyState, size: 42 }}
          className="mx-auto mt-8 w-40 md:mt-32"
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
