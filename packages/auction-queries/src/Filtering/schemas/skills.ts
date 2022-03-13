import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'

const filterSkip: FilterSkip = ({ minSkill, maxSkill, skillKey }): boolean =>
  (minSkill === DEFAULT_FILTER_OPTIONS.minSkill &&
    maxSkill === DEFAULT_FILTER_OPTIONS.maxSkill) ||
  skillKey.size === 0

const filterTest: FilterTest = ({ minSkill, maxSkill, skillKey }) => {
  const selectedSkills = [...skillKey]
  return ({ skills }): boolean =>
    selectedSkills.some(
      (skill) => skills[skill] >= minSkill && skills[skill] <= maxSkill,
    )
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
