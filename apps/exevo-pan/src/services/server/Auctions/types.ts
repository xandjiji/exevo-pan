import { Prisma } from '@prisma/client'

export type PrismaAuctionsQuery = Prisma.CurrentAuctionFindManyArgs

type SortableKeys = keyof FilterProperties<CharacterObject, number>

export type SortKeys = Record<number, SortableKeys>

export type FetchAuctionPageArgs = {
  filterOptions?: Partial<FilterOptions>
  sortOptions?: Partial<SortOptions>
  paginationOptions?: Partial<PaginationOptions>
  history: boolean
}
