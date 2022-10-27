import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ skillKey }) => skillKey.size === 0,
  addQuery: ({ minSkill, skillKey }) => {
    const selectedSkills = [...skillKey] as Array<keyof CharacterSkillsObject>

    return {
      skills: {
        is: { OR: selectedSkills.map((key) => ({ [key]: { gte: minSkill } })) },
      },
    }
  },
}

export default filterQuery
