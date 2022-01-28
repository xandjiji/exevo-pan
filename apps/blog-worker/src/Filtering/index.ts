import * as schema from './schemas'
import { PostTest, FilterPostOptions } from './types'

const filterSchema = Object.values(schema).filter(
  (item) => typeof item !== 'boolean',
)

const buildFilters = (filters: BlogFilterOptions): PostTest => {
  const filterTests = filterSchema
    .filter(({ filterSkip }) => !filterSkip(filters))
    .map(({ filterTest }) => filterTest(filters))

  return (post: BlogPost) => filterTests.every((test) => test(post))
}

export const filterPosts = ({
  posts,
  filters,
}: FilterPostOptions): BlogPost[] => {
  try {
    const builtFilters = buildFilters(filters)
    return posts.filter(builtFilters)
  } catch {
    return []
  }
}
