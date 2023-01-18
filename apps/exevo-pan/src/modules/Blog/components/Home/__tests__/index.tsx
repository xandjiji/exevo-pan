import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
import Home from '..'
import { randomPaginatedPosts } from './mock'

const mockedFetch = setup.fetch()

const getLastBody = (mockedFn: typeof mockedFetch): BlogFilterBodyPayload => {
  const [, args] = mockedFn.mock.calls.shift()!
  return JSON.parse((args as any).body)
}

describe.skip('<Home />', () => {
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

  test('selecting filters should filter posts', () => {
    const { page, pageIndex } = randomPaginatedPosts()
    renderWithProviders(<Home initialIndex={pageIndex} initialPosts={page} />)

    const accordionButton = screen.getByRole('heading', {
      name: 'Filter posts',
    })

    userEvent.click(accordionButton)
    const mostRecentToggle = screen.getByRole('switch', { name: 'Most recent' })
    const searchInput = screen.getByPlaceholderText('Search for posts')
    const newsTag = screen.getByRole('switch', { name: 'News' })

    expect(mostRecentToggle).toBeChecked()
    userEvent.click(mostRecentToggle)
    expect(mostRecentToggle).not.toBeChecked()

    {
      const { sortOptions } = getLastBody(mockedFetch)
      expect(sortOptions.descendingOrder).toEqual(false)
    }

    userEvent.type(searchInput, 'a')
    expect(searchInput).toHaveValue('a')

    {
      const { sortOptions, filterOptions } = getLastBody(mockedFetch)
      expect(sortOptions.descendingOrder).toEqual(false)
      expect(filterOptions.queryString).toEqual('a')
    }

    expect(newsTag).not.toBeChecked()
    userEvent.click(newsTag)
    expect(newsTag).toBeChecked()

    {
      const { sortOptions, filterOptions } = getLastBody(mockedFetch)
      expect(sortOptions.descendingOrder).toEqual(false)
      expect(filterOptions.queryString).toEqual('a')
      expect(filterOptions.tags).toEqual(['news'])
    }
  })

  test('selected tags should be active', () => {
    const { page, pageIndex } = randomPaginatedPosts()
    renderWithProviders(<Home initialIndex={pageIndex} initialPosts={page} />)

    const accordionButton = screen.getByRole('heading', {
      name: 'Filter posts',
    })

    userEvent.click(accordionButton)

    const tagState = {
      News: false,
      Article: false,
      Tutorial: false,
      Tips: false,
    }

    const toggleAndAssert = (name: keyof typeof tagState) => {
      userEvent.click(screen.getByRole('switch', { name }))
      tagState[name] = !tagState[name]

      Object.keys(tagState).forEach((key) => {
        const tagName = key as keyof typeof tagState

        const currentTag = screen.getByRole('switch', { name: tagName })
        if (tagState[tagName]) {
          expect(currentTag).toBeChecked()
        } else {
          expect(currentTag).not.toBeChecked()
        }
      })
    }

    toggleAndAssert('News')
    toggleAndAssert('Tutorial')
    toggleAndAssert('Tips')
    toggleAndAssert('Tutorial')
    toggleAndAssert('Article')
    toggleAndAssert('News')
    toggleAndAssert('Tutorial')
  })
})
