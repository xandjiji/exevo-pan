import { BossGrid } from './components'

type BossTrackerProps = {
  activeServers: string[]
  bossChances: BossChances
  recentlyKilled: BossStats[]
}

const BossTracker = ({
  activeServers,
  bossChances,
  recentlyKilled,
}: BossTrackerProps) => {
  console.log(1)

  return (
    <div className="inner-container flex items-start gap-32">
      <div className="w-fit shrink-0">
        <BossGrid bosses={recentlyKilled} />
      </div>
      <BossGrid bosses={bossChances.bosses} className="grow grid-cols-2" />
    </div>
  )
}

export default BossTracker
