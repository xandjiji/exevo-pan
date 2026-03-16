import { useMemo } from 'react'
import { constTokens as bossTokens } from 'data-dictionary/dist/dictionaries/bosses'
import { Hero } from 'templates'
import { useRouter } from 'next/router'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { debounce, getFeroxaStats, loadRawSrc, MILLISECONDS_IN } from 'utils'
import { Select } from 'components/Organisms'
import { links, routes } from 'Constants'
import { BossGrid, RecentlyAppeared } from './components'

const heroSrc = loadRawSrc('/bosses.png')

type BossTrackerProps = {
  serverOptions: Option[]
  bossChances: BossChances
  recentlyAppeared: BossStats[]
  bestiaryBannerVariant: number
}

const DEBOUNCE_DELAY = 250

const Tracker = ({
  serverOptions,
  bossChances: initialBossChances,
  recentlyAppeared,
  bestiaryBannerVariant,
}: BossTrackerProps) => {
  const { common, bossTracker } = useTranslations()

  const bossChances: typeof initialBossChances = useMemo(
    () => ({
      ...initialBossChances,
      bosses: initialBossChances.bosses.map((boss) =>
        boss.name === bossTokens.Feroxa
          ? { ...boss, ...getFeroxaStats() }
          : boss,
      ),
    }),
    [initialBossChances],
  )

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

  const bestiaryJsxList = [
    // <div>
    //   <p className="text-tsm mb-1.5 font-light">
    //     {templateMessage(common.BestiaryBanner.heading, {
    //       link: (
    //         <a
    //           href={`${links.BESTIARY_ARENA}/?t=exevobossaa`}
    //           target="_blank"
    //           rel="noopener external nofollow noreferrer"
    //           className="text-primaryHighlight font-bold tracking-wide"
    //         >
    //           Bestiary Arena
    //         </a>
    //       ),
    //     })}
    //   </p>
    //
    //   <a
    //     href={`${links.BESTIARY_ARENA}/?t=exevobossaa`}
    //     target="_blank"
    //     rel="noopener external nofollow noreferrer"
    //     className="block h-[60px]"
    //   >
    //     <img
    //       alt="Open Summon Scroll"
    //       className="pixelated mx-auto h-[60px] w-[468px] shadow-lg"
    //       src="https://i.imgur.com/tZ7ba1h.png"
    //     />
    //   </a>
    // </div>,
    <div>
      <p className="text-tsm mb-1.5 font-light">
        {templateMessage(common.BestiaryBanner.heading, {
          link: (
            <a
              href={`${links.BESTIARY_ARENA}/?t=exevobossbb`}
              target="_blank"
              rel="noopener external nofollow noreferrer"
              className="text-primaryHighlight font-bold tracking-wide"
            >
              Bestiary Arena
            </a>
          ),
        })}
      </p>

      <a
        href={`${links.BESTIARY_ARENA}/?t=exevobossbb`}
        target="_blank"
        rel="noopener external nofollow noreferrer"
        className="block h-[60px]"
      >
        <img
          alt="Open Exaltation Chest"
          className="pixelated mx-auto h-[60px] w-[468px] shadow-lg"
          src="https://i.imgur.com/wJigmCt.png"
        />
      </a>
    </div>,
  ]

  const bestiaryJsx =
    bestiaryJsxList[Math.floor(bestiaryBannerVariant * bestiaryJsxList.length)]

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
        className="z-[53] md:max-w-[160px]"
      />

      <div className="grid items-start gap-8 md:relative md:flex md:flex-row-reverse md:gap-16 lg:gap-8">
        <div className="w-full min-w-0 shrink-0 pt-4 md:sticky md:top-[104px] md:w-[320px]">
          <div className="relative mt-2 mb-6 w-full overflow-hidden md:mb-4 md:mt-0">
            <div className="z-1 from-background absolute top-0 right-0 h-full w-8 bg-gradient-to-l to-transparent" />
            {bestiaryJsx}
          </div>

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
