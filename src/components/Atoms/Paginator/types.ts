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

export interface PaginationObject {
  hasPrev: boolean
  hasNext: boolean
  startOffset: number
  endOffset: number
  pageCount: number
}

export interface CursorProps {
  invert?: boolean
  disabled?: boolean
}
