import { useRef } from 'react'
import { useOnScreen } from 'hooks'
import { LazyRenderProps } from './types'

const LazyRender = ({
  estimatedHeight,
  mediaQuery,
  children,
  ...props
}: LazyRenderProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>()

  const onScreen = useOnScreen<HTMLDivElement>(ref)
  const mediaQueryMatches = mediaQuery
    ? window.matchMedia(mediaQuery).matches
    : false

  const shouldRender = onScreen || mediaQueryMatches

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ height: onScreen ? undefined : `${estimatedHeight}px` }}
      {...props}
    >
      {shouldRender && children}
    </div>
  )
}

export default LazyRender
