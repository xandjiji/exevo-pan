import { unminifyGuildData } from '../../utils'
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
