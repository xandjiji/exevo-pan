import { useState, useMemo, useEffect } from 'react'
import RemoveIcon from 'assets/svgs/cross.svg'
import { MILLISECONDS_IN } from 'utils'
import StaminaBar from '../StaminaBar'
import TimeLeft from '../TimeLeft'
import { calculateSecondsToRegenerate, FULL_STAMINA } from '../utils'
import { getSecondsPassed, regenerateStamina, seconds2Time } from './utils'
import { TrackCardProps } from './types'

const TrackCard = ({ trackedData, update, remove }: TrackCardProps) => {
  const { key, name, currentStamina, targetStamina, timestamp } = trackedData

  const [secondsPassed, setSecondsPassed] = useState(() =>
    getSecondsPassed(timestamp),
  )

  const updatedStamina = useMemo(
    () =>
      Math.min(
        regenerateStamina(currentStamina.seconds, secondsPassed),
        FULL_STAMINA,
      ),
    [currentStamina.seconds, secondsPassed],
  )

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

  useEffect(() => {
    const timer = setInterval(
      () => setSecondsPassed(getSecondsPassed(timestamp)),
      MILLISECONDS_IN.MINUTE,
    )

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="card grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <input
          aria-label={name}
          onChange={(e) => update({ key, name: e.target.value })}
          value={name}
          className="decoration-separator text-onSurface inline flex-grow border-0 bg-transparent p-0 text-xs font-bold tracking-wide underline decoration-dashed"
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

      <StaminaBar time={updatedTime} mark={targetStamina.time} blinking />
      {secondsToRegenerate > 0 && (
        <TimeLeft secondsToRegenerate={secondsToRegenerate} />
      )}
    </div>
  )
}

export default TrackCard
