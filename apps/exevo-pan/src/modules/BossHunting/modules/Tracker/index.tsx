import { useMemo } from 'react'
import { Hero } from 'templates'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts/useTranslation'
import { loadRawSrc, MILLISECONDS_IN, debounce } from 'utils'
import { Select } from 'components/Organisms'
import { routes } from 'Constants'
import { BossGrid, RecentlyAppeared } from './components'

const heroSrc = loadRawSrc('/bosses.png')

type BossTrackerProps = {
  serverOptions: Option[]
  bossChances: BossChances
  recentlyAppeared: BossStats[]
}

const DEBOUNCE_DELAY = 250

const Tracker = ({
  serverOptions,
  bossChances,
  recentlyAppeared,
}: BossTrackerProps) => {
  const {
    translations: { common, bossTracker },
  } = useTranslations()

  const hoursSinceLastUpdate = Math.round(
    (+new Date() - bossChances.lastUpdated) / MILLISECONDS_IN.HOUR,
  )

  const subtitle =
    hoursSinceLastUpdate === 0
      ? bossTracker.updated.recently
      : `${bossTracker.updated.hoursAgo.prefix} ${hoursSinceLastUpdate} ${
          hoursSinceLastUpdate > 1 ? common.hours : common.hour
        } ${bossTracker.updated.hoursAgo.suffix}`

  const { push } = useRouter()

  const debouncedNav = useMemo(
    () =>
      debounce(
        (e: React.ChangeEvent<HTMLInputElement>) =>
          push(`${routes.BOSSES.TRACKER}/${e.target.value}`),
        DEBOUNCE_DELAY,
      ),
    [],
  )

  console.log(heroSrc)

  return (
    <div className="inner-container pb-8">
      <Hero
        src={heroSrc}
        title="Boss Tracker"
        offset
        subtitle={subtitle}
        className="md:-mb-16"
      />

      <Select
        label={bossTracker.ServerNavigation.label}
        options={serverOptions}
        defaultValue={bossChances.server}
        onChange={debouncedNav}
        noAlert
        className="z-[53] md:max-w-[160px]"
      />

      <div className="grid items-start gap-8 md:relative md:flex md:flex-row-reverse md:gap-16 lg:gap-8">
        <div className="shrink-0 pt-4 md:sticky md:top-[104px] md:w-[320px]">
          <RecentlyAppeared bosses={recentlyAppeared} />
        </div>

        <div className="bg-separator h-[1px] w-full md:hidden" role="none" />
        <BossGrid
          server={bossChances.server}
          bosses={bossChances.bosses}
          className="grow"
        />
      </div>
    </div>
  )
}

Tracker.heroSrc = heroSrc

export default Tracker
