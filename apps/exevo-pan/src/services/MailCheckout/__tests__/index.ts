import { validate as validateUuid } from 'uuid'
import MailCheckoutClient from '..'

global.fetch = jest.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('services/MailCheckout', () => {
  beforeEach(async () => {
    mockedFetch.mockClear()

    mockedFetch.mockResolvedValue({
      json: async () => ({
        uuid: 'mocked value',
      }),
    } as Response)
  })

  test('if promise resolves, should return a string value', async () => {
    const result = await MailCheckoutClient.postMail({} as AdvertisePurchase)

    expect(result).toEqual('mocked value')
  })

  test('on error, should return a new uuid', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)

    const result = await MailCheckoutClient.postMail({} as AdvertisePurchase)

    expect(validateUuid(result)).toBeTruthy()
  })
})
