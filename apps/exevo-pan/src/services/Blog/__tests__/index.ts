import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/BlogFilters/defaults'
import { setup } from 'utils/test'
import BlogClient from '..'
import { blogPosts, staticPostData, staticPostDataResponse } from './mock'

const mockedFetch = setup.fetch()

const locales = ['en', 'es', 'pl', 'pt']

const randomFrom = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]

describe('BlogClient()', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
    mockedFetch.mockResolvedValue({
      json: async () => ({ page: blogPosts }),
      text: async () => 'content',
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
    test.each(blogPosts.slice(0, 10))(
      'should request the correct endpoint',
      async ({ slug }) => {
        const locale = randomFrom(locales)
        await BlogClient.getStaticPost({
          locale,
          slug,
        })

        const [[calledUrl]] = mockedFetch.mock.calls
        const [, localePath, postFileName] = (calledUrl as string).split('/')
        expect(`${localePath}/${postFileName}`).toEqual(`${locale}/${slug}.mdx`)
      },
    )
  })

  describe('getEveryPostLocale()', () => {
    beforeEach(() => {
      mockedFetch.mockClear()
      mockedFetch.mockResolvedValue({
        json: async () => staticPostData,
      } as Response)
    })

    test('should return all posts', async () => {
      const response = await BlogClient.getEveryPostLocale({ showHidden: true })
      expect(response).toEqual(staticPostDataResponse)
    })

    test('should return all posts that are not hidden', async () => {
      const response = await BlogClient.getEveryPostLocale({})

      Object.values(response).forEach((posts) =>
        expect(posts.every(({ hidden }) => !hidden)).toBeTruthy(),
      )
    })

    test('should filter out a specific slug', async () => {
      const { slug: excludedSlug } = randomFrom(staticPostData['/en'])

      const response = await BlogClient.getEveryPostLocale({ excludedSlug })

      Object.values(response).forEach((posts) =>
        expect(posts.every(({ slug }) => slug !== excludedSlug)).toBeTruthy(),
      )
    })

    test('should return the correct page size', async () => {
      const pageSize = 10
      const response = await BlogClient.getEveryPostLocale({ pageSize })

      Object.values(response).forEach((posts) =>
        expect(posts.length).toEqual(pageSize),
      )
    })
  })
})
