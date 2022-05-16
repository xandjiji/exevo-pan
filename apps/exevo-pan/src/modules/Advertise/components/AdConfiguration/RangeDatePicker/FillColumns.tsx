import { memo } from 'react'

interface FillColumnsProps {
  amount: number
}

const FillColumns = ({ amount }: FillColumnsProps) =>
  amount > 0 && amount < 7 ? (
    <div role="none" style={{ gridColumn: `1 / ${amount + 1}` }} />
  ) : null

export default memo(FillColumns)
