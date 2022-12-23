import { dictionary } from 'data-dictionary/dist/dictionaries/characterTags'

const filterSkip: FilterSkip = ({ tags }): boolean => tags.size === 0

const filterTest: FilterTest = ({ tags: tagsSet }) => {
  const currentTags = new Set<string>([...tagsSet])
  currentTags.delete(dictionary.soulwarAvailable)
  currentTags.delete(dictionary.primalAvailable)

  return ({ tags }): boolean => {
    const characterTagsSet = new Set(tags)

    return [...currentTags].every((quest) => characterTagsSet.has(quest))
  }
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
