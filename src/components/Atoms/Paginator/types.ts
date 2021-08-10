import { HTMLAttributes } from 'react'

export interface PaginatorProps {
  currentPage?: number
  pageSize?: number
  totalItems: number
  onChange?: (newPage: number) => void
  noItemsMessage?: string
  props?: HTMLAttributes<HTMLDivElement>
}

export interface PaginationObject {
  hasPrev: boolean
  hasNext: boolean
  startOffset: number
  endOffset: number
  pageCount: number
}

export interface CursorProps {
  invert?: boolean
}
