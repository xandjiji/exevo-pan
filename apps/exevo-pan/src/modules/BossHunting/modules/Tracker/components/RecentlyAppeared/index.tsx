import clsx from 'clsx'
import { useState } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Button, SpritePortrait } from 'components/Atoms'
import { ChevronDownIcon } from 'assets/svgs'
import { loadBossSrc } from 'utils'
import { hoursAgo } from './utils'
import { RecentlyAppearedProps } from './types'

const HOURS_IN_A_DAY = 24
const OLDER_THRESHOLD = HOURS_IN_A_DAY * 1.5
const MOBILE_VISIBLE_BOSSES = 6

const RecentlyAppeared = ({
  bosses,
  className,
  ...props
}: RecentlyAppearedProps) => {
  const translations = useTranslations()
  const [showAllMobileBosses, setShowAllMobileBosses] = useState(false)

  const hasMoreBossesThanMobileLimit = bosses.length > MOBILE_VISIBLE_BOSSES

  return (
    <section className={clsx('grid gap-4', className)} {...props}>
      <h3 className="text-2xl font-normal">
        {translations.bossTracker.RecentlyAppeared.title}
      </h3>

      <div className="negative-container relative">
        <ul className="container grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2">
          {bosses.map(({ name, lastAppearence }, index) => {
            const hoursSinceItAppeared = hoursAgo(lastAppearence)
            const shouldHideOnMobile =
              index >= MOBILE_VISIBLE_BOSSES && !showAllMobileBosses

            return (
              <li
                key={name}
                title={`${hoursSinceItAppeared} ${
                  hoursSinceItAppeared > 1
                    ? translations.common.hours
                    : translations.common.hour
                } ${translations.bossTracker.RecentlyAppeared.ago}`}
                className={clsx(
                  'flex items-center gap-2',
                  hoursSinceItAppeared >= OLDER_THRESHOLD && 'opacity-40',
                  shouldHideOnMobile && 'hidden md:flex',
                )}
              >
                <SpritePortrait
                  src={loadBossSrc(name)}
                  alt={name}
                  offset
                  width={64}
                  height={64}
                />

                <p className="text-tsm">{name}</p>
              </li>
            )
          })}
        </ul>

        {!showAllMobileBosses && (
          <div
            role="none"
            className="to-background z-1 absolute -bottom-2 -left-1 h-24 w-[calc(100%+16px)] bg-gradient-to-b from-transparent md:hidden"
          />
        )}
      </div>

      {hasMoreBossesThanMobileLimit && !showAllMobileBosses && (
        <Button
          hollow
          pill
          className="mx-auto md:hidden"
          onClick={() => setShowAllMobileBosses(true)}
        >
          <ChevronDownIcon className="h-6 w-6" />
          {translations.bossTracker.RecentlyAppeared.showMore}
        </Button>
      )}
    </section>
  )
}

export default RecentlyAppeared
