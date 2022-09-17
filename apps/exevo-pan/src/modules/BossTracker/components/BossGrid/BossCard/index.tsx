import clsx from 'clsx'
import { SpritePortrait } from 'components/Atoms'
import { InfoTooltip, ClientComponent } from 'components/Organisms'
import { loadBossSrc } from 'utils'
import PinIcon from 'assets/svgs/pin.svg'
import useTimeAgo from './useTimeAgo'
import { BossCardProps } from './types'

const HIGH_CHANCE = 0.25

const BossCard = ({ bossStats, pinned, onPìn }: BossCardProps) => {
  const { name, currentChance, lastAppearences } = bossStats
  const [lastSeen] = lastAppearences.slice(-1)

  const lastSeenText = useTimeAgo(lastSeen)

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
          title="Chance to spawn"
          className={clsx(
            'text-tsm',
            currentChance === undefined
              ? 'text-separator'
              : currentChance >= HIGH_CHANCE && 'text-greenHighlight',
          )}
        >
          {currentChance ? `${(currentChance * 100).toFixed(2)}%` : 'Unknown'}
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
