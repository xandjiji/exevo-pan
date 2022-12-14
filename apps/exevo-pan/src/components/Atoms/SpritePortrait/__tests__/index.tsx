import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import SpritePortrait from '..'

describe('<SpritePortrait />', () => {
  test.skip('should render correctly with src', () => {
    renderWithProviders(
      <SpritePortrait alt="Red skull" width={32} height={32} src="a" />,
    )

    const imgElement = screen.getByAltText('Red skull')
    const loadingElement = screen.getByRole('alert')

    expect(imgElement).toHaveClass('opacity-0')
    expect(loadingElement).toBeVisible()

    fireEvent.load(imgElement)
    expect(imgElement).not.toHaveClass('opacity-0')
    expect(loadingElement).not.toBeVisible()
  })

  test('should display a counter', () => {
    renderWithProviders(
      <SpritePortrait
        alt="Red skull"
        width={32}
        height={32}
        src="a"
        counter={<>2x</>}
      />,
    )

    expect(screen.getByText('2x')).toBeInTheDocument()
  })
})
