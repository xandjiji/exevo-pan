import { memo } from 'react'

type FillElementProps = {
  elementSize: number
  elementsCount: number
}

const FillElement = ({
  elementSize,
  elementsCount,
}: FillElementProps): JSX.Element | null => {
  if (!elementsCount) return null

  return (
    <div role="none" style={{ height: `${elementSize * elementsCount}px` }} />
  )
}

export default memo(FillElement)
