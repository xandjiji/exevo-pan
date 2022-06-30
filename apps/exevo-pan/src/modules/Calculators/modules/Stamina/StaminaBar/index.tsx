import clsx from 'clsx'
import { getStaminaPercentage } from './utils'
import { StaminaBarProps } from './types'

const StaminaBar = ({ time, className, ...props }: StaminaBarProps) => (
  <div
    className={clsx(
      'text-onSurface text-tsm flex flex-wrap justify-between',
      className,
    )}
    {...props}
  >
    <span>Stamina</span>
    <strong>{time}</strong>
    <div className="border-1 mt-1 h-1 w-full border-solid border-black">
      <div
        className="bg-greenHighlight h-full"
        style={{ width: getStaminaPercentage(time) }}
      />
    </div>
  </div>
)

export default StaminaBar
