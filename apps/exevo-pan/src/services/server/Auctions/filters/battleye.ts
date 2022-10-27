/* eslint-disable no-param-reassign */
import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ battleye }) => battleye.size !== 1,
  addQuery: ({ battleye }) => {
    const [isBattleye] = [...battleye]
    return { server: { battleye: isBattleye } }
  },
}

export default filterQuery
