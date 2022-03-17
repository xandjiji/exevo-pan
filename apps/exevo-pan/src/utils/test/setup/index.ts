export const setup = {
  setTimeout: () => {
    jest.useFakeTimers()

    jest
      .spyOn(window, 'setTimeout')
      .mockImplementationOnce((fn) => fn() as unknown as NodeJS.Timeout)
  },
}
