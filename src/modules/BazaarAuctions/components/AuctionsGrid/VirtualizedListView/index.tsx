import {
  memo,
  useState,
  useCallback,
  useMemo,
  Children,
  useEffect,
  useRef,
} from 'react'
import { clampValue } from 'utils'
import FillElement from './FillElement'
import { ListViewProps, OnScrollEvent } from './types'
import * as S from './styles'

const DEFAULT_MIN_INDEX = 0
const DEFAULT_MAX_INDEX = 1

const VirtualizedListView = ({
  estimatedHeight,
  overScan = 0,
  children,
  ...props
}: ListViewProps) => {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const updateMediaQuery = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    }

    updateMediaQuery()
    window.addEventListener('resize', updateMediaQuery)

    return () => window.removeEventListener('resize', updateMediaQuery)
  }, [])

  const flattenChildren = useMemo(() => Children.toArray(children), [children])
  const childrenCount = Children.count(flattenChildren)

  const [minIndex, setMinIndex] = useState(DEFAULT_MIN_INDEX)
  const [maxIndex, setMaxIndex] = useState(DEFAULT_MAX_INDEX)

  const handleScroll = useCallback(
    (event: OnScrollEvent) => {
      const { clientHeight, scrollTop } = event.currentTarget

      const newMinIndex = Math.floor(scrollTop / estimatedHeight)

      const firstItemOffset = estimatedHeight - (scrollTop % estimatedHeight)
      const viewportOverflow = Math.ceil(
        (clientHeight - firstItemOffset) / estimatedHeight,
      )

      const newMaxIndex = newMinIndex + viewportOverflow

      const indexRange: [number, number] = [0, childrenCount - 1]
      setMinIndex(clampValue(newMinIndex - overScan, indexRange))
      setMaxIndex(clampValue(newMaxIndex + overScan, indexRange))
    },
    [childrenCount],
  )

  useEffect(() => {
    setMinIndex(DEFAULT_MIN_INDEX)
    setMaxIndex(DEFAULT_MAX_INDEX)
  }, [childrenCount])

  const renderedChildren = useMemo(
    () => flattenChildren.slice(minIndex, maxIndex + 1),
    [flattenChildren, minIndex, maxIndex],
  )

  const gridRef = useRef<HTMLDivElement>(null)
  useEffect(() => gridRef.current?.scrollTo({ top: 0 }), [children])

  const fillTopElements = minIndex
  const fillBottomElements = childrenCount - (maxIndex + 1)

  return (
    <S.Grid
      ref={gridRef}
      onScroll={isDesktop ? undefined : handleScroll}
      {...props}
    >
      {isDesktop ? (
        children
      ) : (
        <>
          <FillElement
            elementSize={estimatedHeight}
            elementsCount={fillTopElements}
          />

          {renderedChildren}

          <FillElement
            elementSize={estimatedHeight}
            elementsCount={fillBottomElements}
          />
        </>
      )}
    </S.Grid>
  )
}

export default memo(VirtualizedListView)
