const filterSkip: BlogFilterSkip = ({ tags }) => tags.size === 0

const filterTest: BlogFilterTest =
  ({ tags: tagSet }) =>
  ({ tags }): boolean =>
    tags.some((tag) => tagSet.has(tag))

const schema: BlogFilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
