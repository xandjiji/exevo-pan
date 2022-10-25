import { Prisma } from '@prisma/client'

type FilterSkip = (filters: FilterOptions) => boolean

declare type AuctionQuery = NonNullable<
  Prisma.CurrentAuctionFindManyArgs['where']
>

type AddQuery = (
  filterOptions: FilterOptions,
  query: AuctionQuery,
) => AuctionQuery

declare type FilterQuery = {
  filterSkip: FilterSkip
  addQuery: AddQuery
}
