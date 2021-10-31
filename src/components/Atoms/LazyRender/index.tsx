import { useRef } from 'react'
import { useOnScreen } from 'hooks'
import { LazyRenderProps } from './types'

const LazyRender = ({
  estimatedHeight,
  children,
  ...props
}: LazyRenderProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>()
  const onScreen = useOnScreen<HTMLDivElement>(ref)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ height: onScreen ? undefined : `${estimatedHeight}px` }}
      {...props}
    >
      {onScreen && children}
    </div>
  )
}

export default LazyRender
