import clsx from 'clsx'
import BossCard from './BossCard'
import { BossGridProps } from './types'

const BossGrid = ({ bosses, className, ...props }: BossGridProps) => {
  console.log(bosses)

  return (
    <ul className={clsx('grid gap-4', className)} {...props}>
      {bosses.map((bossStats) => (
        <BossCard key={bossStats.name} bossStats={bossStats} />
      ))}
    </ul>
  )
}

export default BossGrid
