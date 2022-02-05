import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Home from '..'
import { randomPaginatedPosts } from './mock'

global.fetch = jest.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('<Home />', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
    mockedFetch.mockResolvedValue({
      json: async () => ({ page: randomPaginatedPosts().page }),
    } as Response)
  })

  test('posts should be displayed correctly', () => {
    const { page, pageIndex } = randomPaginatedPosts()
    renderWithProviders(<Home initialIndex={pageIndex} initialPosts={page} />)

    screen.getAllByRole('article').forEach((element, index) => {
      const { title } = page[index]

      expect(element.querySelector('h3')).toHaveTextContent(title)
    })
  })

  test.todo('selecting filters should filter posts')

  test.todo('selected tags should be active')
})
