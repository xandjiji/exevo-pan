import { DEFAULT_SORT_OPTIONS } from 'shared-utils/dist/contracts/BlogFilters/defaults'

export const applySort = (
  posts: BlogPost[],
  { sortingMode, descendingOrder } = DEFAULT_SORT_OPTIONS,
): BlogPost[] => {
  const data = [...posts]

  if (
    sortingMode === DEFAULT_SORT_OPTIONS.sortingMode &&
    descendingOrder === DEFAULT_SORT_OPTIONS.descendingOrder
  ) {
    return data
  }

  const byDate = (a: BlogPost, b: BlogPost) => {
    if (!descendingOrder) return a.date - b.date
    return b.date - a.date
  }

  switch (sortingMode) {
    case 0:
      return data.sort(byDate)

    default:
      return data
  }
}
