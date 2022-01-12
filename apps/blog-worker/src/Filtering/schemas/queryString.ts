const filterSkip: BlogFilterSkip = ({ queryString }) => queryString.length === 0

const filterTest: BlogFilterTest = ({ queryString }) => {
  const rawTokens = queryString.toLowerCase().split(' ')
  const queryTokens = [...new Set(rawTokens)]

  return ({ title, description }): boolean => {
    const normalizedTitle = title.toLowerCase()
    if (queryTokens.some((token) => normalizedTitle.includes(token))) {
      return true
    }

    const normalizedDescription = description.toLowerCase()
    if (queryTokens.some((token) => normalizedDescription.includes(token))) {
      return true
    }

    return false
  }
}

const schema: BlogFilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
