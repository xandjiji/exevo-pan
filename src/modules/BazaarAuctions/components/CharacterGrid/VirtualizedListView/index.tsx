import {
  forwardRef,
  memo,
  useState,
  useCallback,
  useMemo,
  Children,
  useEffect,
} from 'react'
import { clampValue } from 'utils'
import FillElement from './FillElement'
import { ListViewProps, OnScrollEvent } from './types'
import * as S from './styles'

const VirtualizedListView = forwardRef<HTMLDivElement, ListViewProps>(
  (
    { estimatedHeight, overScan = 0, children, ...props }: ListViewProps,
    ref,
  ) => {
    const [isDesktop, setIsDesktop] = useState(true)

    useEffect(() => {
      const updateMediaQuery = () => {
        setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
      }

      updateMediaQuery()
      window.addEventListener('resize', updateMediaQuery)

      return () => window.removeEventListener('resize', updateMediaQuery)
    }, [])

    const childrenCount = Children.count(children)

    const [minIndex, setMinIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(1)

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

    const renderedChildren = useMemo(
      () =>
        Array.isArray(children)
          ? children.slice(minIndex, maxIndex + 1)
          : children,
      [children, minIndex, maxIndex],
    )

    const fillTopElements = minIndex
    const fillBottomElements = childrenCount - (maxIndex + 1)

    return (
      <S.Grid
        ref={ref}
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
  },
)

export default memo(VirtualizedListView)
