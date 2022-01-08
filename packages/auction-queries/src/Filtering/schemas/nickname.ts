const filterSkip: FilterSkip = ({ nicknameFilter }): boolean =>
  nicknameFilter.length === 0

const filterTest: FilterTest = ({ nicknameFilter }) => {
  const lowerCaseNicknameFilter = nicknameFilter.toLowerCase()

  return ({ nickname }): boolean =>
    nickname.toLowerCase().includes(lowerCaseNicknameFilter)
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
