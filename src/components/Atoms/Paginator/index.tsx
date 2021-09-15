import { useTranslations } from 'contexts/useTranslation'
import { useState, memo } from 'react'
import { clampValue, debounce } from 'utils'
import usePagination from './usePagination'
import * as S from './styles'
import { PaginatorProps } from './types'

const Paginator = ({
  currentPage: currentPageProp,
  pageSize = 1,
  totalItems,
  onChange,
  noItemsMessage = 'No items',
  ...props
}: PaginatorProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [currentPage, setCurrentPage] = useState<number>(currentPageProp ?? 1)
  const derivedCurrentPage = currentPageProp ?? currentPage

  const { hasPrev, hasNext, startOffset, endOffset, pageCount } = usePagination(
    derivedCurrentPage,
    pageSize,
    totalItems,
  )

  const trackerDisplay =
    totalItems > 0
      ? `${startOffset} - ${endOffset} ${common.Of} ${totalItems}`
      : noItemsMessage

  const changePage = debounce((newPage: number) => {
    setCurrentPage(newPage)
    onChange?.(newPage)
  }, 0)

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const { ctrlKey, shiftKey } = event
    const increment = 1 * (+!ctrlKey || 10) * (+!shiftKey || 100)
    const newPage = {
      ArrowUp: derivedCurrentPage + increment,
      ArrowRight: derivedCurrentPage + increment,
      ArrowDown: derivedCurrentPage - increment,
      ArrowLeft: derivedCurrentPage - increment,
    }[event.code]

    if (newPage) {
      event.preventDefault()
      changePage(clampValue(newPage, [1, pageCount]))
    }
  }

  return (
    <S.Wrapper tabIndex={0} onKeyDown={handleKeyPress} {...props}>
      <S.Tracker>{trackerDisplay}</S.Tracker>

      <S.CursorWrapper>
        <S.Cursor
          aria-label={common.Paginator.FirstLabel}
          aria-disabled={!hasPrev}
          disabled={!hasPrev}
          invert
          onClick={() => changePage(1)}
        >
          <S.LastIcon />
        </S.Cursor>
        <S.Cursor
          aria-label={common.Paginator.PreviousLabel}
          aria-disabled={!hasPrev}
          disabled={!hasPrev}
          invert
          onClick={() => changePage(derivedCurrentPage - 1)}
        >
          <S.NextIcon />
        </S.Cursor>

        <S.Cursor
          aria-label={common.Paginator.NextLabel}
          aria-disabled={!hasNext}
          disabled={!hasNext}
          onClick={() => changePage(derivedCurrentPage + 1)}
        >
          <S.NextIcon />
        </S.Cursor>
        <S.Cursor
          aria-label={common.Paginator.LastLabel}
          aria-disabled={!hasNext}
          disabled={!hasNext}
          onClick={() => changePage(pageCount)}
        >
          <S.LastIcon />
        </S.Cursor>
      </S.CursorWrapper>
    </S.Wrapper>
  )
}

export default memo(Paginator)
