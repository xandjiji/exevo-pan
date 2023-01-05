import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { skills as skillsUtil } from 'data-dictionary/dist/dictionaries/skills'
import { getHighestSkill } from 'utils'

const { getSkillKey } = skillsUtil

const SIMILAR_RANGE = {
  LEVEL: 100,
  LOW_SKILL: 10,
  HIGH_SKILL: 5,
}

const getApproximate = {
  level: (level: number): Pick<FilterOptions, 'minLevel' | 'maxLevel'> => {
    if (level < 100) {
      return { minLevel: 0, maxLevel: 150 }
    }

    if (level < 200) {
      return { minLevel: 100, maxLevel: 250 }
    }

    return {
      minLevel: level - SIMILAR_RANGE.LEVEL,
      maxLevel: level + SIMILAR_RANGE.LEVEL,
    }
  },
  skill: (skillLevel: number): Pick<FilterOptions, 'minSkill' | 'maxSkill'> => {
    const range =
      skillLevel < 90 ? SIMILAR_RANGE.LOW_SKILL : SIMILAR_RANGE.HIGH_SKILL

    return {
      minSkill: skillLevel - range,
      maxSkill: skillLevel + range,
    }
  },
}

export const getSimilarCharacterFilters = ({
  level,
  vocationId,
  skills,
  serverData: { serverLocation, battleye, pvpType },
}: CharacterObject): Partial<FilterOptions> => {
  const filters: ReturnType<typeof getSimilarCharacterFilters> = {
    ...getApproximate.level(level),
    vocation: new Set([vocationId]),
    battleye: new Set([battleye]),
    location: new Set([serverLocation.type]),
  }

  const vocationName = vocation.getVocationName(vocationId)

  if (vocationName === 'None') return filters

  const skillKey = new Set<string>()

  if (vocationName === 'Knight') {
    skillKey.add(getSkillKey('axe'))
    skillKey.add(getSkillKey('sword'))
    skillKey.add(getSkillKey('club'))
  }

  if (vocationName === 'Paladin') {
    skillKey.add(getSkillKey('distance'))
  }

  if (vocationName === 'Druid' || vocationName === 'Sorcerer') {
    skillKey.add(getSkillKey('magic'))
  }

  return {
    ...filters,
    ...getApproximate.skill(Math.round(getHighestSkill(skills).value)),
    pvp: new Set([pvpType.type]),
    skillKey,
  }
}
