import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/BlogFilters/defaults'
import BlogClient from '..'
import { blogPosts } from './mock'

global.fetch = jest.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('BlogClient()', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
    mockedFetch.mockResolvedValue({
      json: async () => ({ page: blogPosts } as BlogFilterResponse),
    } as Response)
  })

  describe('queryBlog()', () => {
    const parameters = {
      paginationOptions: DEFAULT_PAGINATION_OPTIONS,
      sortOptions: DEFAULT_SORT_OPTIONS,
      filterOptions: DEFAULT_FILTER_OPTIONS,
    }

    test('should call the default locale', async () => {
      await BlogClient.queryBlog(parameters)
      const [[calledUrl]] = mockedFetch.mock.calls
      const [, urlPath] = (calledUrl as string).split('/')
      expect(urlPath).toEqual('en')
    })

    test('should call the specified locale', async () => {
      await BlogClient.queryBlog(parameters, 'pt')
      const [[calledUrl]] = mockedFetch.mock.calls
      const [, urlPath] = (calledUrl as string).split('/')
      expect(urlPath).toEqual('pt')
    })

    test('should add ?hidden=true query parameter', async () => {
      await BlogClient.queryBlog(parameters, 'pl', true)
      const [[calledUrl]] = mockedFetch.mock.calls
      const [, urlPath] = (calledUrl as string).split('/')
      expect(urlPath).toEqual('pl?hidden=true')
    })
  })

  describe('getStaticPost()', () => {
    test.todo('should request the correct endpoint')
  })

  describe('getEveryPostLocale()', () => {
    test.todo('should bring all posts')

    test.todo('should filter out a specific slug')

    test.todo('should NOT filter hidden posts')

    test.todo('should return the correct page size')
  })
})
