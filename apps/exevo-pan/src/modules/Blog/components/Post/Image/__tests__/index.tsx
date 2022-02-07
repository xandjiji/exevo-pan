import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Image from '..'

describe('<Image />', () => {
  test('should render everything correctly', () => {
    const { container } = renderWithProviders(
      <Image
        src="image-src.png"
        alt="alt-text"
        className="figure-class"
        id="figure-id"
        align="center"
        caption={<div>This is the caption</div>}
        width={30}
        height={30}
      />,
    )

    const imageElement = screen.getByRole('img')
    expect(imageElement).toHaveAccessibleName('alt-text')
    expect(imageElement).toHaveAttribute('src', 'image-src.png')

    const wrapperElement = screen.getByRole('figure')
    expect(container.querySelector('.figure-class')).toEqual(wrapperElement)
    expect(container.querySelector('#figure-id')).toEqual(wrapperElement)
    expect(wrapperElement).toHaveAttribute('data-align', 'center')

    expect(container.querySelector('figcaption')).toHaveTextContent(
      'This is the caption',
    )
  })

  test('should fade in on image load', () => {
    renderWithProviders(
      <Image src="image-src" alt="alt-text" width={30} height={30} />,
    )

    const imgElement = screen.getByAltText('alt-text')

    expect(imgElement).toHaveStyle('opacity: 0')
    fireEvent.load(imgElement)
    expect(imgElement).toHaveStyle('opacity: 1')
  })
})
