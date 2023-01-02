import clsx from 'clsx'
import { PieClockProps } from './types'

const Semicircle = ({
  className,
  style,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      'absolute left-0 h-full w-1/2 rounded-tl-full rounded-bl-full transition-all',
      className,
    )}
    style={{ transformOrigin: 'center right', ...style }}
    {...props}
  />
)

const PieClock = ({
  percentage,
  invert = false,
  size = 'medium',
  className,
  ...props
}: PieClockProps) => (
  <div
    className={clsx(
      'border-primary bg-surface relative rounded-full border-solid transition-all',
      size === 'small' && 'h-4 w-4 border-2',
      size === 'medium' && 'h-6 w-6 border-2',
      size === 'large' && 'h-8 w-8 border-[3px]',
      className,
    )}
    style={{ transform: invert ? 'scaleX(-1)' : undefined }}
    {...props}
  >
    <Semicircle
      className={clsx(
        'z-1',
        percentage >= 0.5 ? 'bg-primaryVariant' : 'bg-surface',
      )}
      style={{ rotate: `${percentage >= 0.5 ? 0.5 : 0}turn` }}
    />
    <Semicircle
      className="bg-primaryVariant"
      style={{ rotate: `${percentage}turn` }}
    />
  </div>
)

export default PieClock
