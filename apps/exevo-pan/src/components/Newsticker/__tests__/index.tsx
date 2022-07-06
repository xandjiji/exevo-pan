import { screen } from '@testing-library/react'
import { renderWithProviders, generateBlogPosts } from 'utils/test'
import { loadThumbnail } from 'utils'
import { routes } from 'Constants'
import Newsticker from '..'

const blogPosts = generateBlogPosts()

describe('<Newsticker />', () => {
  test('should render all the contents correctly', () => {
    renderWithProviders(<Newsticker blogPosts={blogPosts} />)

    expect(
      screen.getByRole('heading', { name: 'Recent articles' }),
    ).toBeInTheDocument()

    const blogPostElements = screen.getAllByRole('article')
    blogPostElements.forEach((post, index) => {
      const sourcePost = blogPosts[index]

      expect(post.querySelector('h3')).toHaveTextContent(sourcePost.title)

      const imageElement = post.querySelector('img') as HTMLImageElement
      expect(imageElement).toHaveAccessibleName(sourcePost.title)
      expect(imageElement).toHaveAttribute(
        'src',
        loadThumbnail(sourcePost.thumbnail, 48),
      )

      const tags = post.querySelectorAll('h3 + div > div')

      tags.forEach((element, tagIndex) => {
        const sourceTag = sourcePost.tags[tagIndex]
        expect(element).toHaveTextContent(sourceTag)
      })

      const linkElement = post.querySelector('a')
      expect(linkElement).toHaveTextContent(sourcePost.title)
      expect(linkElement).toHaveAttribute(
        'href',
        `${routes.BLOG}/${sourcePost.slug}`,
      )
    })
  })
})
