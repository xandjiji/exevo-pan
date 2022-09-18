import { Hero } from 'templates'
import { loadRawSrc } from 'utils'
import { ServerNavigation, BossGrid, RecentlyAppeared } from './components'

const heroSrc = loadRawSrc('/bosses.png')

type BossTrackerProps = {
  activeServers: string[]
  bossChances: BossChances
  recentlyAppeared: BossStats[]
}

const BossTracker = ({
  activeServers,
  bossChances,
  recentlyAppeared,
}: BossTrackerProps) => (
  <>
    <ServerNavigation
      currentServer={bossChances.server}
      activeServers={activeServers}
    />
    <main className="inner-container pb-8">
      <Hero src={heroSrc} title="Boss Tracker" offset />

      <div className="grid items-start gap-8 md:relative md:flex md:flex-row-reverse md:gap-16 lg:gap-8">
        <div className="shrink-0 md:sticky md:top-[134px] md:w-[320px]">
          <RecentlyAppeared bosses={recentlyAppeared} />
        </div>

        <div className="bg-separator h-[1px] w-full md:hidden" role="none" />
        <BossGrid bosses={bossChances.bosses} className="grow" />
      </div>
    </main>
  </>
)

export default BossTracker
