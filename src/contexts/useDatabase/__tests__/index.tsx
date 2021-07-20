/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook, act } from '@testing-library/react-hooks'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'contexts/useTheme'
import { ManageDataClient } from 'services'
import { getFavArray } from 'utils'
import { DatabaseProvider, useDatabase } from '../index'
import {
  mockedPartialCharacterData,
  mockedServerData,
  mockedItemData,
  mockedCharacterData,
  initialFilter,
  mockFavArray,
  filteredFavArray,
} from './mock'

jest.mock('utils', () => ({
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
      characterData: mockedCharacterData,
      serverData: mockedServerData,
      rareItemData: mockedItemData,
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
  })

  test('checking "/bazaar-history" path and filters dispatch', async () => {
    currentHistory.push('/bazaar-history')
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
      characterData: [],
      serverData: mockedServerData,
      rareItemData: mockedItemData,
      historyData: mockedCharacterData,
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
  })
})
