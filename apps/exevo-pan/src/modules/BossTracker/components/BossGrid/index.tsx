import clsx from 'clsx'
import BossCard from './BossCard'
import { BossGridProps } from './types'

const BossGrid = ({ bosses, className, ...props }: BossGridProps) => {
  console.log(bosses)

  return (
    <section className={clsx('grid gap-4', className)} {...props}>
      <h3 className="text-2xl">Bosses</h3>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {bosses.map((bossStats) => (
          <BossCard key={bossStats.name} bossStats={bossStats} />
        ))}
      </ul>
    </section>
  )
}

export default BossGrid
