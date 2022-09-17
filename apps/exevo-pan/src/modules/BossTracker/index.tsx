import { Hero } from 'templates'
import { loadRawSrc } from 'utils'
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
    <main className="inner-container">
      <Hero src={loadRawSrc('/bosses.png')} title="Boss Tracker" offset />

      <div className="grid items-start gap-8 md:flex md:flex-row-reverse md:gap-16 lg:gap-8">
        <div className="shrink-0 md:w-[320px]">
          <RecentlyAppeared bosses={recentlyAppeared} />
        </div>
        <BossGrid bosses={bossChances.bosses} className="grow" />
      </div>
    </main>
  )
}

export default BossTracker
