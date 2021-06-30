import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import imageSrc from 'assets/redSkull.png'
import SpritePortrait from '..'

describe('<SpritePortrait />', () => {
  test('should render correctly with src', () => {
    renderWithProviders(
      <SpritePortrait alt="Red skull" src={imageSrc as string} />,
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
    expect(loadingElement).toBeVisible()
  })

  test('should render correctly without src', () => {
    renderWithProviders(<SpritePortrait alt="Red skull" />)

    const imgElement = screen.getByAltText('Red skull')
    const loadingElement = screen.getByRole('alert')

    expect(imgElement).not.toBeVisible()
    expect(loadingElement).not.toBeVisible()
  })
})
