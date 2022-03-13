import { generateBlogPosts } from 'utils/test'

export const randomPaginatedPosts = (): PaginatedData<BlogPost> => ({
  descendingOrder: true,
  sortingMode: 0,
  endOffset: 100,
  hasNext: true,
  hasPrev: false,
  page: generateBlogPosts().slice(0, 6),
  pageIndex: 0,
  totalItems: 1000,
  startOffset: 0,
})
