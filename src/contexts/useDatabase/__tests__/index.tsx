/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook, act } from '@testing-library/react-hooks'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'contexts/useTheme'
import { ManageDataClient } from 'services'
import { getFavArray } from 'utils'
import { routes } from 'Constants'
import { DatabaseProvider, useDatabase } from '../index'
import {
  mockedPartialCharacterData,
  mockedServerData,
  mockedItemData,
  mockedCharacterData,
  mockStatisticsData,
  initialFilter,
  mockFavArray,
  filteredFavArray,
} from './mock'

jest.mock('utils/localStorage', () => ({
  getFavArray: jest.fn(),
}))

const getFavArrayMock = getFavArray as jest.MockedFunction<typeof getFavArray>

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
      .mockResolvedValueOnce(mockedServerData)

    jest
      .spyOn(ManageDataClient, 'fetchCharacterData')
      .mockResolvedValueOnce(mockedPartialCharacterData)

    jest
      .spyOn(ManageDataClient, 'fetchHistoryData')
      .mockResolvedValueOnce(mockedPartialCharacterData)

    jest
      .spyOn(ManageDataClient, 'fetchItemData')
      .mockResolvedValueOnce(mockedItemData)

    jest
      .spyOn(ManageDataClient, 'fetchStatisticsData')
      .mockResolvedValueOnce(mockStatisticsData)

    getFavArrayMock.mockReturnValue(mockFavArray)
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
      statisticsData: null,
      dispatch: expect.any(Function),
    })
  })

  test(`checking ${routes.HOME} path and filters dispatch`, async () => {
    currentHistory.push(routes.HOME)
    const { result, waitForNextUpdate } = renderHook(() => useDatabase(), {
      wrapper: ComponentWrapper,
    })

    expect(result.current).toEqual({
      loading: true,
      characterData: [],
      serverData: [],
      rareItemData: {},
      historyData: [],
      statisticsData: null,
      dispatch: expect.any(Function),
    })

    await waitForNextUpdate()

    expect(result.current).toEqual({
      loading: false,
      characterData: mockedCharacterData,
      serverData: mockedServerData,
      rareItemData: mockedItemData,
      historyData: [],
      statisticsData: null,
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
        filters: {
          ...initialFilter,
          pvp: new Set([1]),
          minLevel: 103,
          maxLevel: 618,
        },
      })
    })

    result.current.characterData.forEach(character => {
      expect(character.serverData.pvpType.type).toBe(1)
      expect(character.level >= 103 && character.level <= 618).toBeTruthy()
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
          skillKey: new Set(['club', 'magic']),
          minSkill: 120,
        },
      })
    })

    result.current.characterData.forEach(character => {
      expect(
        character.skills.club >= 120 || character.skills.magic >= 120,
      ).toBeTruthy()
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
          imbuementsSet: new Set(['Critical Hit']),
        },
      })
    })

    result.current.characterData.forEach(character => {
      expect(character.imbuements).toContain('Critical Hit')
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: {
          ...initialFilter,
          imbuementsSet: new Set(['Critical Hit', 'Axe Skill']),
        },
      })
    })

    result.current.characterData.forEach(character => {
      expect(character.imbuements).toContain('Critical Hit')
      expect(character.imbuements).toContain('Axe Skill')
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: {
          ...initialFilter,
          fav: true,
        },
      })
    })

    expect(result.current.characterData).toEqual(mockFavArray)

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: {
          ...initialFilter,
          fav: true,
          vocation: new Set([1]),
        },
      })
    })

    expect(result.current.characterData).toEqual(filteredFavArray)

    const serverA = mockedServerData[0].serverName
    const serverB = mockedServerData[1].serverName
    const serverSet = new Set([serverA, serverB])
    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: {
          ...initialFilter,
          serverSet,
        },
      })
    })

    result.current.characterData.forEach(character => {
      expect(serverSet.has(character.serverData.serverName)).toBeTruthy()
    })

    const itemNameA = Object.keys(mockedItemData)[0]
    const itemDataA = mockedItemData[itemNameA]
    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: {
          ...initialFilter,
          itemSet: new Set([itemNameA]),
        },
      })
    })

    result.current.characterData.forEach(character => {
      expect(itemDataA.includes(character.id)).toBeTruthy()
    })

    const itemNameB = Object.keys(mockedItemData)[1]
    const itemDataB = mockedItemData[itemNameB]
    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: false,
        filters: {
          ...initialFilter,
          itemSet: new Set([itemNameA, itemNameB]),
        },
      })
    })

    result.current.characterData.forEach(character => {
      expect(
        itemDataA.includes(character.id) || itemDataB.includes(character.id),
      ).toBeTruthy()
    })
  })

  test(`checking ${routes.BAZAAR_HISTORY} path and filters dispatch`, async () => {
    currentHistory.push(routes.BAZAAR_HISTORY)
    const { result, waitForNextUpdate } = renderHook(() => useDatabase(), {
      wrapper: ComponentWrapper,
    })

    expect(result.current).toEqual({
      loading: true,
      characterData: [],
      serverData: [],
      rareItemData: {},
      historyData: [],
      statisticsData: null,
      dispatch: expect.any(Function),
    })

    await waitForNextUpdate()

    expect(result.current).toEqual({
      loading: false,
      characterData: [],
      serverData: mockedServerData,
      rareItemData: mockedItemData,
      historyData: mockedCharacterData,
      statisticsData: null,
      dispatch: expect.any(Function),
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: { ...initialFilter, pvp: new Set([1]) },
      })
    })

    result.current.historyData.forEach(character => {
      expect(character.serverData.pvpType.type).toBe(1)
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: { ...initialFilter, pvp: new Set([1]), minLevel: 103 },
      })
    })

    result.current.historyData.forEach(character => {
      expect(character.serverData.pvpType.type).toBe(1)
      expect(character.level >= 103).toBeTruthy()
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          pvp: new Set([1]),
          minLevel: 103,
          maxLevel: 618,
        },
      })
    })

    result.current.historyData.forEach(character => {
      expect(character.serverData.pvpType.type).toBe(1)
      expect(character.level >= 103 && character.level <= 618).toBeTruthy()
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: { ...initialFilter, nicknameFilter: 'Muscaria Cubensis' },
      })
    })

    result.current.historyData.forEach(character => {
      expect(character.nickname).toBe('Muscaria Cubensis')
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          skillKey: new Set(['club']),
          minSkill: 110,
        },
      })
    })

    result.current.historyData.forEach(character => {
      expect(character.skills.club >= 110).toBeTruthy()
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          skillKey: new Set(['club', 'magic']),
          minSkill: 120,
        },
      })
    })

    result.current.historyData.forEach(character => {
      expect(
        character.skills.club >= 120 || character.skills.magic >= 120,
      ).toBeTruthy()
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          battleye: new Set([true]),
        },
      })
    })

    result.current.historyData.forEach(character => {
      expect(character.serverData.battleye).toBe(true)
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          imbuementsSet: new Set(['Critical Hit']),
        },
      })
    })

    result.current.historyData.forEach(character => {
      expect(character.imbuements).toContain('Critical Hit')
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          imbuementsSet: new Set(['Critical Hit', 'Axe Skill']),
        },
      })
    })

    result.current.historyData.forEach(character => {
      expect(character.imbuements).toContain('Critical Hit')
      expect(character.imbuements).toContain('Axe Skill')
    })

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          fav: true,
        },
      })
    })

    expect(result.current.historyData).toEqual(mockFavArray)

    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          fav: true,
          vocation: new Set([1]),
        },
      })
    })

    expect(result.current.historyData).toEqual(filteredFavArray)

    const serverA = mockedServerData[0].serverName
    const serverB = mockedServerData[1].serverName
    const serverSet = new Set([serverA, serverB])
    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          serverSet,
        },
      })
    })

    result.current.historyData.forEach(character => {
      expect(serverSet.has(character.serverData.serverName)).toBeTruthy()
    })

    const itemNameA = Object.keys(mockedItemData)[0]
    const itemDataA = mockedItemData[itemNameA]
    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          itemSet: new Set([itemNameA]),
        },
      })
    })

    result.current.historyData.forEach(character => {
      expect(itemDataA.includes(character.id)).toBeTruthy()
    })

    const itemNameB = Object.keys(mockedItemData)[1]
    const itemDataB = mockedItemData[itemNameB]
    act(() => {
      result.current.dispatch({
        type: 'APPLY_FILTERS',
        isHistory: true,
        filters: {
          ...initialFilter,
          itemSet: new Set([itemNameA, itemNameB]),
        },
      })
    })

    result.current.historyData.forEach(character => {
      expect(
        itemDataA.includes(character.id) || itemDataB.includes(character.id),
      ).toBeTruthy()
    })
  })

  test('checking reset to base data dispatch', async () => {
    currentHistory.push(routes.HOME)
    const { result, waitForNextUpdate } = renderHook(() => useDatabase(), {
      wrapper: ComponentWrapper,
    })

    expect(result.current).toEqual({
      loading: true,
      characterData: [],
      serverData: [],
      rareItemData: {},
      historyData: [],
      statisticsData: null,
      dispatch: expect.any(Function),
    })

    await waitForNextUpdate()

    expect(result.current).toEqual({
      loading: false,
      characterData: mockedCharacterData,
      serverData: mockedServerData,
      rareItemData: mockedItemData,
      historyData: [],
      statisticsData: null,
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
      result.current.dispatch({ type: 'RESET_TO_BASE_DATA' })
    })

    expect(result.current).toEqual({
      loading: false,
      characterData: mockedCharacterData,
      serverData: mockedServerData,
      rareItemData: mockedItemData,
      historyData: [],
      statisticsData: null,
      dispatch: expect.any(Function),
    })
  })
})
