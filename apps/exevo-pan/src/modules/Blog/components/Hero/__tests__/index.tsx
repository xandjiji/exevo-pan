import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Hero from '..'

const imageSrc = 'imageSrc.png'

describe('<Hero />', () => {
  test('should render without subtitle', () => {
    renderWithProviders(<Hero title="Hero title" src={imageSrc} />)

    expect(
      screen.getByRole('heading', { name: 'Hero title' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Hero title' })).toHaveAttribute(
      'src',
      imageSrc,
    )
  })

  test('should render with subtitle', () => {
    renderWithProviders(
      <Hero title="Hero title" subtitle="Hero subtitle" src={imageSrc} />,
    )

    expect(
      screen.getByRole('heading', { name: 'Hero title' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Hero subtitle')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Hero title' })).toHaveAttribute(
      'src',
      imageSrc,
    )
  })
})
