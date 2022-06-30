import { useMemo } from 'react'
import clsx from 'clsx'
import { time2Minutes, getStaminaPercentage, staminaColor } from './utils'
import { StaminaBarProps } from './types'

/* @ ToDo:
- colors
- mark?
*/

const StaminaBar = ({ time, className, ...props }: StaminaBarProps) => {
  const staminaMinutes = useMemo(() => time2Minutes(time), [time])

  return (
    <div
      className={clsx(
        'text-onSurface text-tsm flex flex-wrap justify-between',
        className,
      )}
      {...props}
    >
      <span>Stamina</span>
      <span>{time}</span>
      <div className="border-1 bg-separator/30 mt-1 h-1 w-full border-solid border-black">
        <div
          className="h-full transition-all"
          style={{
            width: getStaminaPercentage(staminaMinutes),
            backgroundColor: staminaColor(staminaMinutes),
          }}
        />
      </div>
    </div>
  )
}

export default StaminaBar
