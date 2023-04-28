export const isEmptyCharacter = ({
  level,
  skills,
}: Pick<CharacterObject, 'level' | 'skills'>): boolean =>
  level <= 20 && Math.max(...Object.values(skills)) < 60
