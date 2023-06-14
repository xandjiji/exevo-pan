import { useState, useMemo, useEffect, useCallback, memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { TrashIcon } from 'assets/svgs'
import { MILLISECONDS_IN, blurOnEnter } from 'utils'
import StaminaBar from '../StaminaBar'
import TimeLeft from '../TimeLeft'
import { calculateSecondsToRegenerate, FULL_STAMINA } from '../utils'
import { getSecondsPassed, regenerateStamina, seconds2Time } from './utils'
import { TrackCardProps } from './types'

const ANIMATION_DELAY = 200

const TrackCard = ({ index, trackedData, update, remove }: TrackCardProps) => {
  const { key, name, currentStamina, targetStamina, timestamp } = trackedData

  const { calculators } = useTranslations()

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

  const [willBeDeleted, setWillBeDeleted] = useState(false)
  const handleDelete = useCallback(() => {
    setWillBeDeleted(true)
    setTimeout(() => remove(key), ANIMATION_DELAY)
  }, [key])

  return (
    <div
      className={clsx(
        'card grid gap-4 lg:place-content-start lg:items-start',
        willBeDeleted ? 'animate-implode' : 'animate-zoomInAndOut',
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <input
          aria-label={name}
          onChange={(e) => update({ key, name: e.target.value })}
          value={name}
          placeholder={`${calculators.Stamina.newCharacter} (${index})`}
          onKeyPress={blurOnEnter}
          enterKeyHint="done"
          className={clsx(
            'text-primaryHighlight flex-grow border-0 bg-transparent p-0 text-xs font-bold tracking-wider placeholder:font-light',
            !name && 'decoration-separator underline decoration-dashed',
          )}
        />

        <button
          type="button"
          className="clickable group h-4 w-4 shrink-0 rounded"
          aria-label={calculators.Stamina.removeItem}
          onClick={handleDelete}
        >
          <TrashIcon className="fill-separator group-hover:fill-red h-4 w-4" />
        </button>
      </div>

      <StaminaBar time={updatedTime} mark={targetStamina.time} blinking />
      {secondsToRegenerate > 0 && (
        <TimeLeft secondsToRegenerate={secondsToRegenerate} />
      )}
    </div>
  )
}

export default memo(TrackCard)
