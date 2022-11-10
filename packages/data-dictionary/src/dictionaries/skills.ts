const getSkillKey = (
  skillKey: keyof CharacterSkillsObject,
): keyof CharacterSkillsObject => skillKey

export const skills = { getSkillKey }
