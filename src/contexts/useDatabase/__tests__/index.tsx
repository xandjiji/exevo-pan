/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook } from '@testing-library/react-hooks'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'contexts/useTheme'
import { ManageDataClient } from 'services'
import { DatabaseProvider, useDatabase } from '../index'
import { charBuildedData, serverData, itemData, completeCharData } from './mock'

const currentHistory = createBrowserHistory()

const ComponentWrapper: React.FC = ({ children }): React.ReactElement => (
  <Router history={currentHistory}>
    <ThemeProvider>
      <DatabaseProvider>{children}</DatabaseProvider>
    </ThemeProvider>
  </Router>
)

describe('useDatabase()', () => {
  beforeEach(() => {
    jest
      .spyOn(ManageDataClient, 'fetchServerData')
      .mockResolvedValueOnce(serverData)

    jest
      .spyOn(ManageDataClient, 'fetchCharacterData')
      .mockResolvedValueOnce(charBuildedData)

    jest
      .spyOn(ManageDataClient, 'fetchItemData')
      .mockResolvedValueOnce(itemData)
  })

  test('checking initial state', () => {
    currentHistory.push('/test-init')
    const { result } = renderHook(() => useDatabase(), {
      wrapper: ComponentWrapper,
    })

    expect(result.current).toEqual({
      loading: false,
      characterData: [],
      serverData: [],
      rareItemData: {},
      historyData: [],
      dispatch: expect.any(Function),
    })
  })

  test('checking "/" path', async () => {
    currentHistory.push('/')
    const { result, waitForNextUpdate } = renderHook(() => useDatabase(), {
      wrapper: ComponentWrapper,
    })

    expect(result.current).toEqual({
      loading: true,
      characterData: [],
      serverData: [],
      rareItemData: {},
      historyData: [],
      dispatch: expect.any(Function),
    })

    await waitForNextUpdate()

    expect(result.current).toEqual({
      loading: false,
      characterData: completeCharData,
      serverData,
      rareItemData: itemData,
      historyData: [],
      dispatch: expect.any(Function),
    })
  })
})
