import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import imageSrc from 'assets/redSkull.png'
import SpritePortrait from '..'

describe('<SpritePortrait />', () => {
  test('should render correctly with src', () => {
    renderWithProviders(
      <SpritePortrait alt="Red skull" src={imageSrc as unknown as string} />,
    )

    const imgElement = screen.getByAltText('Red skull')
    const loadingElement = screen.getByRole('alert')

    expect(imgElement).not.toBeVisible()
    expect(loadingElement).toBeVisible()

    fireEvent.load(imgElement)
    expect(imgElement).toBeVisible()
    expect(loadingElement).not.toBeVisible()

    fireEvent.error(imgElement)
    expect(imgElement).not.toBeVisible()
  })

  test('should render correctly without src', () => {
    const { container } = renderWithProviders(<SpritePortrait />)

    expect(container).toBeInTheDocument()
  })
})
