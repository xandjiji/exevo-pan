import { memo } from 'react'
import clsx from 'clsx'
import { Text } from 'components/Atoms'
import { formatNumberWithCommas } from 'utils'

type CostComparisonProps = {
  title: React.ReactNode
  cost: number
  compareTo: number
}

const CostComparison = ({ title, cost, compareTo }: CostComparisonProps) => {
  const costDiff = compareTo - cost

  return (
    <div className="grid gap-1">
      <strong className="flex items-center justify-center gap-1">
        {title}
      </strong>
      <Text.GoldCoin value={cost} />
      <small>
        (
        <strong
          className={clsx(
            costDiff < 0 && 'text-red',
            costDiff > 0 && 'text-green',
          )}
        >
          {costDiff < 0 && '+'}
          {costDiff > 0 && '-'}
          {formatNumberWithCommas(costDiff)} gp
        </strong>
        )
      </small>
    </div>
  )
}

export default memo(CostComparison)
