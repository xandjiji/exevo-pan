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
import { ListViewProps, OnScrollEvent, VirtualizedState } from './types'
import * as S from './styles'

const ESTIMATED_HEIGHT = 470

const VirtualizedListView = forwardRef<HTMLDivElement, ListViewProps>(
  ({ children, ...props }: ListViewProps, ref) => {
    const childrenCount = Children.count(children)

    const [{ minIndex, maxIndex }, setIndexState] = useState<VirtualizedState>({
      minIndex: 0,
      maxIndex: 1,
    })

    const handleScroll = useCallback(
      (event: OnScrollEvent) => {
        const { clientHeight, scrollTop } = event.currentTarget

        const newMinIndex = Math.floor(scrollTop / ESTIMATED_HEIGHT)

        const firstItemOffset =
          ESTIMATED_HEIGHT - (scrollTop % ESTIMATED_HEIGHT)
        const viewportOverflow = Math.ceil(
          (clientHeight - firstItemOffset) / ESTIMATED_HEIGHT,
        )

        const newMaxIndex = clampValue(newMinIndex + viewportOverflow, [
          0,
          childrenCount - 1,
        ])

        setIndexState({
          minIndex: newMinIndex,
          maxIndex: newMaxIndex,
        })
      },
      [childrenCount],
    )

    const fillTopElements = minIndex
    const fillBottomElements = childrenCount - (maxIndex + 1)

    const childrenElements = useMemo(
      () => (Array.isArray(children) ? children.flat(1) : children),
      [children],
    )
    const renderedChildren = useMemo(
      () =>
        Array.isArray(childrenElements)
          ? childrenElements.slice(minIndex, maxIndex + 1)
          : childrenElements,
      [childrenElements, minIndex, maxIndex],
    )

    const [isDesktop, setIsDesktop] = useState(true)

    useEffect(() => {
      const updateMediaQuery = () => {
        setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
      }

      updateMediaQuery()
      window.addEventListener('resize', updateMediaQuery)

      return () => window.removeEventListener('resize', updateMediaQuery)
    }, [])

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
              elementSize={ESTIMATED_HEIGHT}
              elementsCount={fillTopElements}
            />

            {renderedChildren}

            <FillElement
              elementSize={ESTIMATED_HEIGHT}
              elementsCount={fillBottomElements}
            />
          </>
        )}
      </S.Grid>
    )
  },
)

export default memo(VirtualizedListView)
