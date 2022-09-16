import { SpritePortrait, Chip } from 'components/Atoms'
import { InfoTooltip } from 'components/Organisms'
import { loadBossSrc } from 'utils'
import useTimeAgo from './useTimeAgo'
import { BossCardProps } from './types'

const BossCard = ({ bossStats }: BossCardProps) => {
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
        <div className="flex items-center gap-1.5">
          <h4 className="text-base">{name}</h4>
          {lastSeenText && <InfoTooltip content={lastSeenText} labelSize />}
        </div>

        <Chip className="w-fit text-xs" gray title="Chance to spawn">
          {currentChance ? `${(currentChance * 100).toFixed(2)}%` : 'Unknown'}
        </Chip>
      </div>
    </li>
  )
}

export default BossCard
