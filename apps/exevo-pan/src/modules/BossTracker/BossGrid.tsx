import { BossCard } from './components'

type BossGridProps = {
  bosses: BossStats[]
}

const BossGrid = ({ bosses }: BossGridProps) => {
  console.log(bosses)

  return (
    <ul className="grid grid-cols-3 gap-4">
      {bosses.map((bossStats) => (
        <BossCard key={bossStats.name} bossStats={bossStats} />
      ))}
    </ul>
  )
}

export default BossGrid
