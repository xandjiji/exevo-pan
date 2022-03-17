import { useRouter } from 'next/router'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'

export const setup = {
  setTimeout: (): void => {
    jest.useFakeTimers()

    jest
      .spyOn(window, 'setTimeout')
      .mockImplementationOnce((fn) => fn() as unknown as NodeJS.Timeout)
  },
  fetch: (): jest.MockedFunction<typeof fetch> => {
    global.fetch = jest.fn()
    return fetch as jest.MockedFunction<typeof fetch>
  },
  useRouter: (): jest.MockedFunction<typeof useRouter> =>
    useRouter as jest.MockedFunction<typeof useRouter>,
  getFromLocalStorage: (): jest.MockedFunction<typeof getFromLocalStorage> =>
    getFromLocalStorage as jest.MockedFunction<typeof getFromLocalStorage>,
  saveToLocalStorage: (): jest.MockedFunction<typeof saveToLocalStorage> =>
    saveToLocalStorage as jest.MockedFunction<typeof saveToLocalStorage>,
}
