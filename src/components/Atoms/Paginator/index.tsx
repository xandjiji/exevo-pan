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
        <S.Cursor invert onClick={() => setCurrentPage(1)}>
          <S.LastIcon />
        </S.Cursor>
        <S.Cursor
          invert
          onClick={() => {
            if (hasPrev) setCurrentPage(prev => prev - 1)
          }}
        >
          <S.NextIcon />
        </S.Cursor>

        <S.Cursor
          onClick={() => {
            if (hasNext) setCurrentPage(prev => prev + 1)
          }}
        >
          <S.NextIcon />
        </S.Cursor>
        <S.Cursor onClick={() => setCurrentPage(pageCount)}>
          <S.LastIcon />
        </S.Cursor>
      </S.CursorWrapper>
    </S.Wrapper>
  )
}

export default Paginator
