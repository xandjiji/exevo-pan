import { renderWithProviders, generateBlogPosts } from 'utils/test'
import PostGrid from '..'

const mockedPosts = generateBlogPosts().slice(0, 10)

describe('<PostGrid />', () => {
  test('should render all posts correctly', () => {
    const { container } = renderWithProviders(
      <PostGrid gridTitle="Recent posts" posts={mockedPosts} />,
    )

    const postItems = container.querySelectorAll('h4')

    postItems.forEach((element, index) => {
      const { title } = mockedPosts[index]
      expect(element).toHaveTextContent(title)
    })
  })
})
