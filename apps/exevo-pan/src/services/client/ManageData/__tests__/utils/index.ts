import { unminifyGuildData } from 'shared-utils/dist/unminifyGuildData'
import { mockedMembersData } from './mock'

describe('utils/', () => {
  test('unminifyGuildData()', () => {
    expect(
      unminifyGuildData(
        mockedMembersData.miniPuneMembersData,
        'Libertabra Pune',
        0,
      ),
    ).toEqual(mockedMembersData.puneMembersData)
  })
})
