import { dictionary } from 'data-dictionary/dist/dictionaries/characterTags'
import { FilterQuery } from 'types/FilterQuery'

const filteredOutTags = new Set([dictionary.soulwarAvailable])

const filterQuery: FilterQuery = {
  filterSkip: ({ tags }) => tags.size === 0,
  addQuery: ({ tags }) => {
    const searchedTags = [...tags].filter((tag) => !filteredOutTags.has(tag))
    return { tags: { hasEvery: searchedTags } }
  },
}

export default filterQuery
