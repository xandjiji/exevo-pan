const filterSkip: FilterSkip = ({ rareNick }): boolean => !rareNick

const RARE_WORD_COUNT = 4
const MINIMUM_RARE_CHARACTER_COUNT = 3
const specialCharacters = /[äëïöüÿ'-.,]/i
const twoConsecutiveUppercase = /[A-Z][A-Z]/

const isRareNickname = (nickname: string): boolean => {
  if (nickname.length <= MINIMUM_RARE_CHARACTER_COUNT) return true
  if (specialCharacters.test(nickname)) return true
  if (twoConsecutiveUppercase.test(nickname)) return true
  if (nickname.split(' ').length >= RARE_WORD_COUNT) return true

  return false
}

const filterTest: FilterTest =
  () =>
  ({ nickname }): boolean =>
    isRareNickname(nickname)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
