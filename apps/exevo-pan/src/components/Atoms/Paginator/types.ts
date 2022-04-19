import { HTMLAttributes } from 'react'

export interface PaginatorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  currentPage?: number
  pageSize?: number
  totalItems: number
  onChange?: (newPage: number) => void
  noItemsMessage?: string
}

export interface PaginationObject {
  hasPrev: boolean
  hasNext: boolean
  startOffset: number
  endOffset: number
  pageCount: number
}

export type IconProps = {
  icon: React.ReactElement
  disabled: boolean
}
