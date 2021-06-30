import { renderHook, act } from '@testing-library/react-hooks'
import { useTheme, ThemeProvider } from '..'

const mockGetItem = jest.fn()
const mockSetItem = jest.fn()

Object.defineProperty(window, 'localStorage', {
  configurable: true,
  writable: true,
  value: { getItem: mockGetItem, setItem: mockSetItem },
})

describe('useTheme()', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should work correctly, with empty localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    expect(result.current.currentTheme).toEqual('light-theme')
    expect(mockGetItem).toBeCalledTimes(1)
    expect(mockGetItem).toHaveBeenLastCalledWith('theme')

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.currentTheme).toEqual('dark-theme')
    expect(mockSetItem).toBeCalledTimes(1)
    expect(mockSetItem).toHaveBeenLastCalledWith('theme', 'dark-theme')

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.currentTheme).toEqual('light-theme')
    expect(mockSetItem).toBeCalledTimes(2)
    expect(mockSetItem).toHaveBeenLastCalledWith('theme', 'light-theme')
  })

  test('should work correctly, with an initial localStorage value', () => {
    mockGetItem.mockReturnValueOnce('dark-theme')
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    expect(result.current.currentTheme).toEqual('dark-theme')
    expect(mockGetItem).toBeCalledTimes(1)
    expect(mockGetItem).toHaveBeenLastCalledWith('theme')

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.currentTheme).toEqual('light-theme')
    expect(mockSetItem).toBeCalledTimes(1)
    expect(mockSetItem).toHaveBeenLastCalledWith('theme', 'light-theme')

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.currentTheme).toEqual('dark-theme')
    expect(mockSetItem).toBeCalledTimes(2)
    expect(mockSetItem).toHaveBeenLastCalledWith('theme', 'dark-theme')
  })

  test('should work correctly, with an invalid localStorage value', () => {
    mockGetItem.mockReturnValueOnce('pink-theme')
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    expect(result.current.currentTheme).toEqual('light-theme')
    expect(mockGetItem).toBeCalledTimes(1)
    expect(mockGetItem).toHaveBeenLastCalledWith('theme')

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.currentTheme).toEqual('dark-theme')
    expect(mockSetItem).toBeCalledTimes(1)
    expect(mockSetItem).toHaveBeenLastCalledWith('theme', 'dark-theme')

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.currentTheme).toEqual('light-theme')
    expect(mockSetItem).toBeCalledTimes(2)
    expect(mockSetItem).toHaveBeenLastCalledWith('theme', 'light-theme')
  })
})
