import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import * as IntersectionObserver from './intersectionObserver'

export const setup = {
  setTimeout: (): void => {
    jest.useFakeTimers()

    jest
      .spyOn(window, 'setTimeout')
      .mockImplementationOnce((fn) => fn() as unknown as NodeJS.Timeout)
  },
  setInterval: (): void => {
    jest.useFakeTimers()

    jest
      .spyOn(window, 'setInterval')
      .mockImplementationOnce((fn) => fn() as unknown as NodeJS.Timeout)
  },
  URLSearchParams: {
    get: (value?: string) =>
      jest
        .spyOn(URLSearchParams.prototype, 'get')
        .mockImplementation(() => value ?? null),
  },
  fetch: (): jest.MockedFunction<typeof fetch> => {
    global.fetch = jest.fn()
    return fetch as jest.MockedFunction<typeof fetch>
  },
  scrollIntoView: (): jest.Mock<any, any> => {
    const mockedScrollIntoView = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = mockedScrollIntoView

    return mockedScrollIntoView
  },
  IntersectionObserver,
  useRouter: (): jest.MockedFunction<typeof useRouter> =>
    useRouter as jest.MockedFunction<typeof useRouter>,
  useSession: (): jest.MockedFunction<typeof useSession> =>
    useSession as jest.MockedFunction<typeof useSession>,
  getFromLocalStorage: (): jest.MockedFunction<typeof getFromLocalStorage> =>
    getFromLocalStorage as jest.MockedFunction<typeof getFromLocalStorage>,
  saveToLocalStorage: (): jest.MockedFunction<typeof saveToLocalStorage> =>
    saveToLocalStorage as jest.MockedFunction<typeof saveToLocalStorage>,
}
