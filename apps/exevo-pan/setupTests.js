import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

jest.mock('utils/debounce', () => ({ debounce: (fn) => fn }))
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn().mockReturnValue({ pathname: '/' }),
}))
jest.mock('next-auth/react')
jest.mock('next/link', () => (props) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a {...props} />
))

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

jest.mock('devalue', () => ({
  uneval: jest.fn(),
}))

jest.mock('hooks/useOnScreen', () => jest.fn().mockReturnValue(true))

expect.extend(toHaveNoViolations)
