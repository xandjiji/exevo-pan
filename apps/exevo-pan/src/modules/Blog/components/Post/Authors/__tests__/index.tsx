import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Authors from '..'

const mockedAuthor = 'Ksu'

const mockedTranslator = 'Not Mom'

describe('<Authors />', () => {
  test('should render the author data correctly', () => {
    renderWithProviders(<Authors author={mockedAuthor} />)

    expect(screen.getByText('Author')).toBeInTheDocument()

    expect(screen.getByText(mockedAuthor)).toBeInTheDocument()

    const spriteElement = screen.getByRole('img')
    expect(spriteElement).toHaveAccessibleName(mockedAuthor)
  })

  test('should render the author AND translator data correctly', () => {
    renderWithProviders(
      <Authors author={mockedAuthor} translator={mockedTranslator} />,
    )

    expect(screen.getByText('Author')).toBeInTheDocument()
    expect(screen.getByText('Translator')).toBeInTheDocument()

    expect(screen.getByText(mockedAuthor)).toBeInTheDocument()
    expect(screen.getByText(mockedTranslator)).toBeInTheDocument()

    const [authorSprite, translatorSprite] = screen.getAllByRole('img')
    expect(authorSprite).toHaveAccessibleName(mockedAuthor)

    expect(translatorSprite).toHaveAccessibleName(mockedTranslator)
  })
})
