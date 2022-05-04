import { memo } from 'react'
import clsx from 'clsx'
import { PercentageCardProps } from './types'

const PercentageCard = ({
  title,
  percentage,
  className,
  ...props
}: PercentageCardProps) => (
  <section
    className={clsx(
      'card flex flex-col justify-center p-5 text-center transition-colors',
      className,
    )}
    {...props}
  >
    <h4 className="text-onSurface text-base font-light">{title}</h4>
    <span
      className={clsx(
        'text-[46px] font-bold',
        percentage >= 50 ? 'text-green' : 'text-red',
      )}
    >
      {percentage}%
    </span>
  </section>
)

export default memo(PercentageCard)
