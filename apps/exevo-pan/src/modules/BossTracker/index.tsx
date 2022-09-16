import { BossGrid, RecentlyAppeared } from './components'

type BossTrackerProps = {
  activeServers: string[]
  bossChances: BossChances
  recentlyAppeared: BossStats[]
}

const BossTracker = ({
  activeServers,
  bossChances,
  recentlyAppeared,
}: BossTrackerProps) => {
  console.log(1)

  return (
    <div className="inner-container grid items-start gap-8 md:flex md:flex-row-reverse md:gap-16 lg:gap-8">
      <div className="shrink-0 md:w-[320px]">
        <RecentlyAppeared bosses={recentlyAppeared} />
      </div>
      <BossGrid bosses={bossChances.bosses} className="grow" />
    </div>
  )
}

export default BossTracker
