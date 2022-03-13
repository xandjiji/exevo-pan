import * as faker from 'faker'
import { unminifyGuildData } from 'shared-utils/dist/unminifyGuildData'

const randomMiniMemberWarData = (): MiniMemberWarData => [
  faker.name.firstName(),
  faker.datatype.number({ min: 1, max: 4 }),
  faker.datatype.number({ min: 45, max: 2000 }),
  faker.datatype.number({ min: 0, max: 10000 }),
  faker.datatype.number({ min: 0, max: 2000 }),
]

export const randomGuildMembersWarData = (): MiniMemberWarData[] =>
  Array.from({ length: faker.datatype.number({ min: 2000, max: 6000 }) }, () =>
    randomMiniMemberWarData(),
  )

export const randomGuildWarData = (): {
  miniPuneMembersData: MiniMemberWarData[]
  miniBonesMembersData: MiniMemberWarData[]
  puneMembersData: MemberWarData[]
  bonesMembersData: MemberWarData[]
  allGuildMembers: MemberWarData[]
} => {
  const miniPuneMembersData = randomGuildMembersWarData()
  const miniBonesMembersData = randomGuildMembersWarData()

  const puneMembersData = unminifyGuildData(
    miniPuneMembersData,
    'Libertabra Pune',
    0,
  )
  const bonesMembersData = unminifyGuildData(
    miniBonesMembersData,
    'Bones Alliance',
    1,
  )

  const allGuildMembers = [...puneMembersData, ...bonesMembersData].sort(
    (a, b) => b.level - a.level,
  )

  return {
    miniPuneMembersData,
    miniBonesMembersData,
    puneMembersData,
    bonesMembersData,
    allGuildMembers,
  }
}
