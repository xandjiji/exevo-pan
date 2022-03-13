import { screen } from '@testing-library/react'
import { renderWithProviders, generateBlogPosts } from 'utils/test'
import { useFetchPosts } from '../../../../contexts/useFetchPosts'
import { FetchPostsContextValues } from '../../../../contexts/useFetchPosts/types'
import PostGrid from '..'

jest.mock('../../../../contexts/useFetchPosts', () => ({
  useFetchPosts: jest.fn(),
}))

const mockedFetchPosts = useFetchPosts as jest.MockedFunction<
  typeof useFetchPosts
>

const mockedPosts = generateBlogPosts().slice(0, 10)

describe('<PostGrid />', () => {
  test('should render all posts correctly', () => {
    mockedFetchPosts.mockImplementation(
      () =>
        ({
          postList: mockedPosts,
          fetchNextPage: jest.fn(),
          requestStatus: 'IDLE',
        } as unknown as FetchPostsContextValues),
    )

    const { container } = renderWithProviders(<PostGrid />)
    const titles = container.querySelectorAll('h3')

    titles.forEach((titleElement, index) => {
      const { title } = mockedPosts[index]
      expect(titleElement).toHaveTextContent(title)
    })
  })

  test('should render empty state correctly', () => {
    mockedFetchPosts.mockImplementation(
      () =>
        ({
          postList: [],
          fetchNextPage: jest.fn(),
          requestStatus: 'SUCCESSFUL',
        } as unknown as FetchPostsContextValues),
    )

    renderWithProviders(<PostGrid />)

    expect(screen.getByRole('img')).toHaveAccessibleName('No posts were found')
  })
})
