export const getHighestSkill = (
  skills: CharacterSkillsObject,
): CharacterSkill => {
  const [highestSkill] = Object.entries(skills)
    .map(([skill, value]) => ({
      skill: skill as keyof CharacterSkillsObject,
      value,
    }))
    .sort((a, b) => b.value - a.value)

  return highestSkill
}
