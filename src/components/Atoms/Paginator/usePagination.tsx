import { useMemo } from 'react'
import { PaginationObject } from './types'

const usePagination = (
  currentPage: number,
  pageSize: number,
  totalItems: number,
): PaginationObject => {
  const pageCount = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize],
  )

  const hasPrev = currentPage > 1
  const hasNext = currentPage < pageCount

  const startOffset = (currentPage - 1) * pageSize + 1
  const endOffset = hasNext ? currentPage * pageSize : totalItems

  return {
    hasPrev,
    hasNext,
    startOffset,
    endOffset,
    pageCount,
  }
}

export default usePagination
