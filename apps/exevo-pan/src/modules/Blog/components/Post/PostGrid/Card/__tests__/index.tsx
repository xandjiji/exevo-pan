import { screen } from '@testing-library/react'
import { renderWithProviders, generateBlogPosts } from 'utils/test'
import { routes } from 'Constants'
import Card from '..'

const mockedPosts = generateBlogPosts().slice(0, 10)

describe('<Card />', () => {
  test.each(mockedPosts)('should post content correctly', (blogPost) => {
    renderWithProviders(<Card post={blogPost} />)

    const { title, thumbnail, slug } = blogPost
    expect(screen.getByRole('heading')).toHaveTextContent(title)

    const thumbnailElement = screen.getByRole('img')
    expect(thumbnailElement).toHaveAccessibleName(title)
    expect(thumbnailElement).toHaveAttribute('src', thumbnail)

    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveTextContent(title)
    expect(linkElement).toHaveAttribute('href', `${routes.BLOG}/${slug}`)
  })
})
