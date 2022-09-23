import clsx from 'clsx'
import { SpritePortrait } from 'components/Atoms'
import { InfoTooltip, ClientComponent } from 'components/Organisms'
import { loadBossSrc } from 'utils'
import PinIcon from 'assets/svgs/pin.svg'
import useTimeAgo from './useTimeAgo'
import { formatChance, getChanceClass } from './utils'
import { BossCardProps } from './types'

const BossCard = ({ bossStats, pinned, onPìn }: BossCardProps) => {
  const { name, currentChance, lastAppearence } = bossStats

  const lastSeenText = useTimeAgo(lastAppearence)

  const chancePercent = formatChance(currentChance)
  const chanceClass = getChanceClass(currentChance)

  return (
    <li className="card flex items-center gap-2">
      <SpritePortrait
        src={loadBossSrc(name)}
        alt={name}
        offset
        width={64}
        height={64}
      />
      <div className="grid gap-1.5">
        <h4 className="text-base">
          {name}{' '}
          {lastSeenText && <InfoTooltip content={lastSeenText} labelSize />}
        </h4>

        <small
          title="Chance to spawn today"
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
              UNKNOWN: 'Unknown',
              ZERO: 'No chance',
              POSSIBLE: chancePercent,
              LIKELY: chancePercent,
            }[chanceClass]
          }
        </small>
      </div>

      <button
        type="button"
        className="clickable ml-auto grid place-items-center self-start rounded p-1"
        onClick={() => onPìn(name)}
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
