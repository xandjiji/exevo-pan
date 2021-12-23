/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook } from '@testing-library/react-hooks'
import { useRouter, NextRouter } from 'next/router'
import { wrapWithProviders } from 'utils/test'
import { ManageDataClient } from 'services'
import { routes } from 'Constants'
import { DatabaseProvider, useDatabase } from '../index'
import { mockedGuildData } from './mock'

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

const ComponentWrapper = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement =>
  wrapWithProviders(<DatabaseProvider>{children}</DatabaseProvider>)

const initialDatabaseValue = {
  loading: false,
  warGuildData: [],
  dispatch: expect.any(Function),
}

describe('useDatabase()', () => {
  beforeEach(() => {
    jest
      .spyOn(ManageDataClient, 'fetchGuildWarData')
      .mockResolvedValueOnce(mockedGuildData.puneMembersData)
      .mockResolvedValueOnce(mockedGuildData.bonesMembersData)
  })

  test(`checking ${routes.LIBERTABRA_WAR_SEARCH} path`, async () => {
    mockedUseRouter.mockReturnValue({
      pathname: routes.LIBERTABRA_WAR_SEARCH,
    } as NextRouter)
    const { result, waitForNextUpdate } = renderHook(() => useDatabase(), {
      wrapper: ComponentWrapper,
    })

    expect(result.current).toEqual({
      ...initialDatabaseValue,
      loading: true,
    })

    await waitForNextUpdate()

    expect(result.current).toEqual({
      ...initialDatabaseValue,
      warGuildData: mockedGuildData.allGuildMembers,
    })
  })
})
