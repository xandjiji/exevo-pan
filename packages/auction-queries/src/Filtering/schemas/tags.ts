import { dictionary } from 'data-dictionary/dist/dictionaries/characterTags'

const filterSkip: FilterSkip = ({ tags }): boolean => tags.size === 0

const filterTest: FilterTest = ({ tags: tagsSet }) => {
  const selectedTags = [...tagsSet].filter(
    (tag) =>
      tag !== dictionary.soulwarAvailable && tag !== dictionary.primalAvailable,
  )

  return ({ tags }): boolean => {
    const characterTagsSet = new Set(tags)

    return selectedTags.every((quest) => characterTagsSet.has(quest))
  }
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
