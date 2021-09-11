// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'

const randomMiniMemberWarData = (): MiniMemberWarData => [
  faker.name.firstName(),
  faker.datatype.number({ min: 1, max: 4 }),
  faker.datatype.number({ min: 45, max: 2000 }),
  faker.datatype.number({ min: 0, max: 10000 }),
  faker.datatype.number({ min: 0, max: 2000 }),
]

export const randomMembersWarData = (): MiniMemberWarData[] =>
  Array.from({ length: faker.datatype.number({ min: 2000, max: 6000 }) }, () =>
    randomMiniMemberWarData(),
  )
