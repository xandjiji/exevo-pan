import { memo } from 'react'

type FillElementProps = {
  elementSize: number
  elementsCount: number
}

const FillElement = ({
  elementSize,
  elementsCount,
}: FillElementProps): JSX.Element => (
  <div role="none" style={{ height: `${elementSize * elementsCount}px` }} />
)

export default memo(FillElement)
