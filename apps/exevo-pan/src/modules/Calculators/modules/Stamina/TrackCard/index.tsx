import { useMemo } from 'react'
import RemoveIcon from 'assets/svgs/cross.svg'
import StaminaBar from '../StaminaBar'
import TimeLeft from '../TimeLeft'
import { calculateSecondsToRegenerate } from '../utils'
import { regenerateStamina, seconds2Time } from './utils'
import { TrackCardProps } from './types'

const TrackCard = ({ trackedData, update, remove }: TrackCardProps) => {
  const { key, name, currentStamina, targetStamina, timestamp } = trackedData

  const updatedStamina = useMemo(() => {
    const secondsPassed = Math.round((+new Date() - timestamp) / 1000)

    return regenerateStamina(currentStamina.seconds, secondsPassed)
  }, [timestamp, currentStamina.seconds])

  const updatedTime = useMemo(
    () => seconds2Time(updatedStamina),
    [updatedStamina],
  )

  const secondsToRegenerate = useMemo(
    () =>
      Math.max(
        calculateSecondsToRegenerate(updatedStamina, targetStamina.seconds),
        0,
      ),
    [updatedStamina, targetStamina.seconds],
  )

  return (
    <div className="card grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <input
          aria-label={name}
          onChange={(e) => update({ key, name: e.target.value })}
          value={name}
          className="inline flex-grow border-0 p-0 text-xs font-bold tracking-wide"
        />

        <button
          type="button"
          className="clickable h-4 w-4 shrink-0"
          /* @ ToDo: i18n */
          aria-label="Remove this item"
          onClick={() => remove(key)}
        >
          <RemoveIcon className="fill-red h-4 w-4" />
        </button>
      </div>

      <StaminaBar time={updatedTime} mark={targetStamina.time} />
      {secondsToRegenerate > 0 && (
        <TimeLeft secondsToRegenerate={secondsToRegenerate} />
      )}
    </div>
  )
}

export default TrackCard
