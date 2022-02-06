import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Authors from '..'

const mockedAuthor: BlogPostAuthor = {
  name: 'Ksu',
  outfit: 'outfit.png',
}

const mockedTranslator: BlogPostAuthor = {
  name: 'Not Mom',
  outfit: 'not-mom.png',
}

describe('<Authors />', () => {
  test('should render the author data correctly', () => {
    renderWithProviders(<Authors author={mockedAuthor} />)

    expect(screen.getByText('Author')).toBeInTheDocument()

    expect(screen.getByText(mockedAuthor.name)).toBeInTheDocument()

    const spriteElement = screen.getByRole('img')
    expect(spriteElement).toHaveAccessibleName(mockedAuthor.name)
    expect(spriteElement).toHaveAttribute('src', mockedAuthor.outfit)
  })

  test('should render the author AND translator data correctly', () => {
    renderWithProviders(
      <Authors author={mockedAuthor} translator={mockedTranslator} />,
    )

    expect(screen.getByText('Author')).toBeInTheDocument()
    expect(screen.getByText('Translator')).toBeInTheDocument()

    expect(screen.getByText(mockedAuthor.name)).toBeInTheDocument()
    expect(screen.getByText(mockedTranslator.name)).toBeInTheDocument()

    const [authorSprite, translatorSprite] = screen.getAllByRole('img')
    expect(authorSprite).toHaveAccessibleName(mockedAuthor.name)
    expect(authorSprite).toHaveAttribute('src', mockedAuthor.outfit)

    expect(translatorSprite).toHaveAccessibleName(mockedTranslator.name)
    expect(translatorSprite).toHaveAttribute('src', mockedTranslator.outfit)
  })
})
