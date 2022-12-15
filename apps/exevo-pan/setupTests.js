import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

jest.mock('utils/debounce', () => ({ debounce: (fn) => fn }))
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn().mockReturnValue({ pathname: '/' }),
}))
jest.mock('next-auth/react')

jest.mock('utils/localStorage', () => ({
  getFromLocalStorage: jest
    .fn()
    .mockImplementation((_, fallbackObject) => fallbackObject),
  saveToLocalStorage: jest.fn(),
}))

const mockedImageComponent = ({ ...props }) => <img {...props} />
jest.mock('next/image', () => mockedImageComponent)

const mockedFocusLock = ({ children }) => children
jest.mock('react-focus-lock', () => mockedFocusLock)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false,
  })),
})

Object.defineProperty(window.Element.prototype, 'scroll', {
  writable: true,
  value: jest.fn(),
})

const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})
window.IntersectionObserver = mockIntersectionObserver

const mockGtag = jest.fn()
mockGtag.mockReturnValue({
  pageView: jest.fn(),
  blogPostView: jest.fn(),
  filterUsed: jest.fn(),
})
window.gtag = mockGtag

jest.mock('hooks/useOnScreen', () => jest.fn().mockReturnValue(true))

expect.extend(toHaveNoViolations)
