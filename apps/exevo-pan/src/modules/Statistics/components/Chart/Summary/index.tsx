import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { memo } from 'react'
import { formatNumberWithCommas } from 'utils'
import TrendIcon from 'assets/svgs/trending.svg'
import { SummaryProps } from './types'

const Summary = ({
  title,
  value,
  percentage,
  positive = true,
  ...props
}: SummaryProps) => {
  const {
    translations: { statistics },
  } = useTranslations()

  return (
    <div {...props}>
      <h4 className="text-s text-onSurface font-light transition-colors">
        {title}
      </h4>
      <span className="text-l text-onSurface mt-1.5 mb-2 flex items-center font-bold">{`${formatNumberWithCommas(
        value,
      )} TC`}</span>
      <span
        className={clsx(
          'text-tsm flex items-center font-bold',
          positive ? 'text-green' : 'text-red',
        )}
      >
        <TrendIcon
          aria-label={
            statistics.Summary[
              positive ? 'positiveTrendLabel' : 'negativeTrendLabel'
            ]
          }
          className={clsx('mr-1 h-4 w-4', positive ? 'fill-green' : 'fill-red')}
          style={{ transform: positive ? 'none' : 'scaleY(-1)' }}
        />
        {`${percentage.toFixed(2)}%`}
      </span>
    </div>
  )
}

export default memo(Summary)
