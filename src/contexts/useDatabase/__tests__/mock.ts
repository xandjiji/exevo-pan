import { randomDataset } from 'utils/test'

const { statisticsData, puneMembersData, bonesMembersData, allGuildMembers } =
  randomDataset()

export const mockStatisticsData = statisticsData

export const mockedGuildData = {
  puneMembersData,
  bonesMembersData,
  allGuildMembers,
}
