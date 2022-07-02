import { useState, useMemo, useEffect } from 'react'
import clsx from 'clsx'
import RemoveIcon from 'assets/svgs/trash.svg'
import { MILLISECONDS_IN } from 'utils'
import StaminaBar from '../StaminaBar'
import TimeLeft from '../TimeLeft'
import { calculateSecondsToRegenerate, FULL_STAMINA } from '../utils'
import { getSecondsPassed, regenerateStamina, seconds2Time } from './utils'
import { TrackCardProps } from './types'

const TrackCard = ({ index, trackedData, update, remove }: TrackCardProps) => {
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
    <div className="card grid gap-4 lg:place-content-start lg:items-start">
      <div className="flex items-center justify-between gap-4">
        <input
          aria-label={name}
          onChange={(e) => update({ key, name: e.target.value })}
          value={name}
          className={clsx(
            'text-primaryHighlight flex-grow border-0 bg-transparent p-0 text-xs font-bold tracking-wider placeholder:font-light',
            !name && 'decoration-separator underline decoration-dashed',
          )}
          /* @ ToDo: i18n */
          placeholder={`New character (${index})`}
        />

        <button
          type="button"
          className="clickable group h-4 w-4 shrink-0 rounded"
          /* @ ToDo: i18n */
          aria-label="Remove this item"
          onClick={() => remove(key)}
        >
          <RemoveIcon className="fill-separator group-hover:fill-red h-4 w-4" />
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
