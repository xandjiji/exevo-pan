import { useState } from 'react'
import usePagination from './usePagination'

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

  return (
    <div>
      <p>currentPage: {derivedCurrentPage}</p>
      <p>{`${startOffset} - ${endOffset} of ${totalItems}`}</p>
      <button onClick={() => setCurrentPage(1)}>|{'<'}</button>
      <button
        onClick={() => {
          if (hasPrev) setCurrentPage(prev => prev - 1)
        }}
      >
        {'<'}
      </button>

      <button
        onClick={() => {
          if (hasNext) setCurrentPage(prev => prev + 1)
        }}
      >
        {'>'}
      </button>
      <button onClick={() => setCurrentPage(pageCount)}>{'>'}|</button>
    </div>
  )
}

export default Paginator
