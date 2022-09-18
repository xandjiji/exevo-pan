import { useState, useMemo } from 'react'
import EmptyState from 'components/EmptyState'
import { ChipGroup } from 'components/Organisms'
import clsx from 'clsx'
import usePinBoss from './usePinBoss'
import { listBy } from './utils'
import BossCard from './BossCard'
import { BossGridProps, ListOption } from './types'

const BossGrid = ({ bosses, className, ...props }: BossGridProps) => {
  const [listingOption, setListingOption] = useState<ListOption>('chance')
  const list = useMemo(
    () => listBy[listingOption](bosses),
    [bosses, listingOption],
  )

  /* @ ToDo: i18n */
  const listOptions: TypedOption<ListOption>[] = [
    { name: '🍀 Chance', value: 'chance' },
    { name: '🔤 Name', value: 'name' },
    { name: '✓ Last seen', value: 'recent' },
    { name: '️‍🔥 PoI', value: 'POI' },
    { name: '🧛🏻 Vampire Lord Tokens', value: 'vampires' },
    { name: '☠️ Archdemons', value: 'archdemons' },
    { name: '📌 Favorites', value: 'pinned' },
  ]

  const [pinnedBosses, toggleBoss] = usePinBoss()

  const listNotEmpty = list.length > 0

  return (
    <section className={clsx('flex flex-col gap-4', className)} {...props}>
      <ChipGroup
        label="List bosses by"
        options={listOptions}
        value={listingOption}
        onChange={(e) => setListingOption(e.target.value as ListOption)}
        className="bg-background z-2 after:bg-background after:-z-1 sticky top-[60px] -mb-3 -mt-6 pb-3 pt-6 after:absolute after:-left-2 after:top-0 after:h-full after:w-[calc(100%_+_16px)]"
      />

      {listNotEmpty ? (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
          {list.map((bossStats) => (
            <BossCard
              key={bossStats.name}
              bossStats={bossStats}
              pinned={pinnedBosses.includes(bossStats.name)}
              onPìn={toggleBoss}
            />
          ))}
        </ul>
      ) : (
        <EmptyState
          text={{ content: 'No bosses', size: 42 }}
          className="mx-auto mt-8 w-40 md:mt-32"
        />
      )}
    </section>
  )
}

export default BossGrid
