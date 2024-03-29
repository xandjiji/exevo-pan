import { useMemo, memo } from 'react'
import clsx from 'clsx'
import { time2Minutes, getStaminaPercentage, staminaColor } from './utils'
import { StaminaBarProps } from './types'

const StaminaBar = ({
  time,
  mark,
  blinking = false,
  className,
  ...props
}: StaminaBarProps) => {
  const [hours, minutes] = time.split(':')
  const staminaMinutes = useMemo(() => time2Minutes(time), [time])

  const markPosition = useMemo(() => {
    if (!mark) return undefined

    return getStaminaPercentage(time2Minutes(mark))
  }, [mark])

  return (
    <div
      className={clsx(
        'text-onSurface text-tsm flex flex-wrap justify-between',
        className,
      )}
      {...props}
    >
      <span>Stamina</span>
      <strong>
        {hours}
        <span className={clsx('mx-[1px]', blinking && 'animate-blinking')}>
          :
        </span>
        {minutes}
      </strong>
      <div
        className="border-1 bg-separator/30 relative mt-1 h-1 w-full border-solid border-black"
        title={mark}
      >
        <div
          className="h-full transition-all"
          style={{
            width: getStaminaPercentage(staminaMinutes),
            backgroundColor: staminaColor(staminaMinutes),
          }}
        />

        {markPosition && (
          <div
            className="text-primary absolute bottom-[-12px] transition-all after:content-['▴']"
            style={{ left: markPosition, transform: 'translateX(-50%)' }}
          />
        )}
      </div>
    </div>
  )
}

export default memo(StaminaBar)
