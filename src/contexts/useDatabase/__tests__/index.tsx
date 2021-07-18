/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook, act } from '@testing-library/react-hooks'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'contexts/useTheme'
import { ManageDataClient } from 'services'
import { DatabaseProvider, useDatabase } from '../index'
import {
  charBuildedData,
  serverData,
  itemData,
  completeCharData,
  filterTestA,
  filterResultA,
  initialFilter,
} from './mock'

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
      .spyOn(ManageDataClient, 'fetchHistoryData')
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

  test('checking "/" path and filters dispatch', async () => {
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

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: filterTestA,
      })
    })

    expect(result.current).toEqual({
      loading: false,
      characterData: filterResultA,
      serverData,
      rareItemData: itemData,
      historyData: [],
      dispatch: expect.any(Function),
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: { ...initialFilter, pvp: new Set([1]) },
      })
    })

    result.current.characterData.forEach(character => {
      expect(character.serverData.pvpType.type).toBe(1)
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: { ...initialFilter, pvp: new Set([1]), minLevel: 103 },
      })
    })

    result.current.characterData.forEach(character => {
      expect(character.serverData.pvpType.type).toBe(1)
      expect(character.level >= 103).toBeTruthy()
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: { ...initialFilter, nicknameFilter: 'Muscaria Cubensis' },
      })
    })

    result.current.characterData.forEach(character => {
      expect(character.nickname).toBe('Muscaria Cubensis')
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: {
          ...initialFilter,
          skillKey: new Set(['club']),
          minSkill: 110,
        },
      })
    })

    result.current.characterData.forEach(character => {
      expect(character.skills.club >= 110).toBeTruthy()
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: {
          ...initialFilter,
          battleye: new Set([true]),
        },
      })
    })

    result.current.characterData.forEach(character => {
      expect(character.serverData.battleye).toBe(true)
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: {
          ...initialFilter,
          rareNick: true,
        },
      })
    })

    expect(result.current.characterData).toHaveLength(1)
  })
})
