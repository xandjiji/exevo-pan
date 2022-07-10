import { memo } from 'react'
import { Text } from 'components/Atoms'
import { formatNumberWithCommas } from 'utils'

type CostComparisonProps = {
  title: React.ReactNode
  cost: number
  compareTo: number
}

const CostComparison = ({ title, cost, compareTo }: CostComparisonProps) => (
  <div className="grid gap-1">
    <strong className="flex items-center justify-center gap-1">{title}</strong>
    <Text.GoldCoin value={cost} />
    <small className="text-red">{`(${formatNumberWithCommas(
      compareTo - cost,
    )}gp difference)`}</small>
  </div>
)

export default memo(CostComparison)
