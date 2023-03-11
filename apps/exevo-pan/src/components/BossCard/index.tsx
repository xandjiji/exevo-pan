import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { SpritePortrait, RareFrame } from 'components/Atoms'
import { InfoTooltip, Tooltip, ClientComponent } from 'components/Organisms'
import { loadBossSrc } from 'utils'
import { PinIcon } from 'assets/svgs'
import useTimeAgo from './useTimeAgo'
import { formatChance, getChanceClass } from './utils'
import { BossCardProps } from './types'

const BossCard = ({
  premium = false,
  bossStats,
  pinned,
  onPin,
  className,
  ...props
}: BossCardProps) => {
  const {
    translations: { common },
  } = useTranslations()
  const i18n = common.BossCard

  const {
    name,
    currentChance,
    daysLeftForPossibleSpawns,
    expectedIn,
    lastAppearence,
  } = bossStats

  const lastSeenText = useTimeAgo(lastAppearence)

  const chancePercent = formatChance(currentChance)
  const chanceClass = getChanceClass(currentChance)

  const isClickable = !!props.onClick

  return (
    <li
      className={clsx(
        'card group relative flex items-center gap-2',
        isClickable && 'clickable',
        className,
      )}
      {...props}
    >
      {premium && <RareFrame />}
      <SpritePortrait
        src={loadBossSrc(name)}
        alt={name}
        offset
        width={64}
        height={64}
        className={clsx(
          isClickable && 'relative top-0 transition-all group-hover:-top-0.5',
        )}
      />
      <div className="grid gap-1">
        <h4 className={clsx('text-base', premium && 'text-rare')}>
          {name}{' '}
          {lastSeenText && <InfoTooltip content={lastSeenText} labelSize />}
        </h4>

        {daysLeftForPossibleSpawns ? (
          <div className="flex flex-wrap items-center gap-2">
            {daysLeftForPossibleSpawns.map((daysLeft, index) => {
              const isAvailable = daysLeft <= 0

              return (
                <Tooltip
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${name}-${index}-${daysLeft}`}
                  content={
                    <div className="grid gap-2">
                      <p>
                        {i18n.thisCreatureHas}{' '}
                        <strong>{daysLeftForPossibleSpawns.length}</strong>{' '}
                        {i18n.differentSpawnLocations}
                      </p>

                      <p>
                        {isAvailable ? (
                          <>
                            {i18n.itIs}{' '}
                            <strong className="text-green">
                              {i18n.possible}
                            </strong>{' '}
                            {i18n.toSpawn}
                          </>
                        ) : (
                          <>
                            {i18n.thereAre}{' '}
                            <strong className="text-red">
                              {daysLeft} {common[daysLeft > 1 ? 'days' : 'day']}{' '}
                              {i18n.left}
                            </strong>{' '}
                            {i18n.before}
                          </>
                        )}
                      </p>

                      <p>{i18n.itsUpToYou} 🕵️‍♂️</p>
                    </div>
                  }
                >
                  <small>{daysLeft > 0 ? '🟥' : '🟩'}</small>
                </Tooltip>
              )
            })}
          </div>
        ) : (
          <>
            <small
              title={i18n.chanceToSpawn}
              className={clsx(
                'text-tsm',
                {
                  UNKNOWN: 'text-separator',
                  ZERO: 'text-red',
                  POSSIBLE: 'text-onSurface',
                  LIKELY: 'text-greenHighlight',
                }[chanceClass],
              )}
            >
              {
                {
                  UNKNOWN: i18n.unknown,
                  ZERO: i18n.noChance,
                  POSSIBLE: chancePercent,
                  LIKELY: chancePercent,
                }[chanceClass]
              }
            </small>

            {expectedIn && (
              <small className="text-onSurface text-xs font-light">
                {i18n.expectedIn}:{' '}
                <span className="font-normal">
                  {expectedIn} {common[expectedIn > 1 ? 'days' : 'day']}
                </span>
              </small>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        aria-label={i18n[pinned ? 'unpin' : 'pin']}
        className="clickable ml-auto grid place-items-center self-start rounded p-1"
        onClick={(e) => {
          e.stopPropagation()
          onPin(name)
        }}
      >
        <ClientComponent>
          <PinIcon
            className={clsx(
              'h-4 w-4 transition-all',
              pinned ? 'fill-primaryHighlight' : 'fill-separator',
            )}
            style={{ rotate: pinned ? 'unset' : '45deg' }}
          />
        </ClientComponent>
      </button>
    </li>
  )
}

export default BossCard
