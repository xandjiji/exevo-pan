import { useState, useRef, useEffect } from 'react'
import { useOnScreen } from 'hooks'
import { LazyRenderProps } from './types'

const LazyRender = ({
  estimatedHeight,
  mediaQuery,
  children,
  ...props
}: LazyRenderProps) => {
  const [shouldRender, setShouldRender] = useState(true)

  const ref = useRef<HTMLDivElement>()
  const onScreen = useOnScreen<HTMLDivElement>(ref)

  useEffect(() => {
    const mediaQueryMatches = mediaQuery
      ? window.matchMedia(mediaQuery).matches
      : false

    setShouldRender(onScreen || mediaQueryMatches)
  }, [onScreen])

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ minHeight: onScreen ? undefined : `${estimatedHeight}px` }}
      {...props}
    >
      {shouldRender && children}
    </div>
  )
}

export default LazyRender
