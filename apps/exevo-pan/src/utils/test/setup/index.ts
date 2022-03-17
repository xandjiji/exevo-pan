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
}
