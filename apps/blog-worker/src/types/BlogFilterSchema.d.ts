declare type BlogFilterSkip = (filters: BlogFilterOptions) => boolean

declare type BlogFilterTest = (
  filters: BlogFilterOptions,
) => (post: BlogPost) => boolean

declare type BlogFilterSchema = {
  filterSkip: BlogFilterSkip
  filterTest: BlogFilterTest
}
