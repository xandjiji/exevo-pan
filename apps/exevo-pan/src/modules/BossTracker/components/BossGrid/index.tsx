import { useState, useMemo } from 'react'
import { ChipGroup } from 'components/Organisms'
import clsx from 'clsx'
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
    { name: 'Chance', value: 'chance' },
    { name: 'Name', value: 'name' },
    { name: 'Last seen', value: 'recent' },
    { name: 'PoI', value: 'POI' },
    { name: 'Vampire Lord Tokens', value: 'vampires' },
    { name: 'Archdemons', value: 'archdemons' },
  ]

  return (
    <section className={clsx('grid gap-4', className)} {...props}>
      <ChipGroup
        label="List bosses by"
        options={listOptions}
        value={listingOption}
        onChange={(e) => setListingOption(e.target.value as ListOption)}
      />

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {list.map((bossStats) => (
          <BossCard key={bossStats.name} bossStats={bossStats} />
        ))}
      </ul>
    </section>
  )
}

export default BossGrid
