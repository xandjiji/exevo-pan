import { useState } from 'react'
import usePagination from './usePagination'
import * as S from './styles'

export interface PaginationChangeData {
  currentPage: number
  pageSize: number
}

export interface PaginatorProps {
  currentPage?: number
  pageSize?: number
  totalItems: number
  onChange?: (data: PaginationChangeData) => void
}

const Paginator = ({
  currentPage: currentPageProp,
  pageSize = 1,
  totalItems,
}: PaginatorProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(currentPageProp ?? 1)
  const derivedCurrentPage = currentPageProp ?? currentPage

  const { hasPrev, hasNext, startOffset, endOffset, pageCount } = usePagination(
    derivedCurrentPage,
    pageSize,
    totalItems,
  )

  const trackerDisplay =
    totalItems > 0
      ? `${startOffset} - ${endOffset} of ${totalItems}`
      : 'No characters found'

  return (
    <S.Wrapper>
      <S.Tracker>{trackerDisplay}</S.Tracker>

      <S.CursorWrapper>
        <S.Cursor
          aria-label="Go to first page"
          aria-disabled={!hasPrev}
          disabled={!hasPrev}
          invert
          onClick={() => setCurrentPage(1)}
        >
          <S.LastIcon />
        </S.Cursor>
        <S.Cursor
          aria-label="Go to previous page"
          aria-disabled={!hasPrev}
          disabled={!hasPrev}
          invert
          onClick={() => {
            if (hasPrev) setCurrentPage(prev => prev - 1)
          }}
        >
          <S.NextIcon />
        </S.Cursor>

        <S.Cursor
          aria-label="Go to next page"
          aria-disabled={!hasNext}
          disabled={!hasNext}
          onClick={() => {
            if (hasNext) setCurrentPage(prev => prev + 1)
          }}
        >
          <S.NextIcon />
        </S.Cursor>
        <S.Cursor
          aria-label="Go to last page"
          aria-disabled={!hasNext}
          disabled={!hasNext}
          onClick={() => setCurrentPage(pageCount)}
        >
          <S.LastIcon />
        </S.Cursor>
      </S.CursorWrapper>
    </S.Wrapper>
  )
}

export default Paginator
