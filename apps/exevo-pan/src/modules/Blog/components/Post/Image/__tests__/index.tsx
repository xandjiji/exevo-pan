import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Image from '..'

describe('<Image />', () => {
  test('should render everything correctly', () => {
    const { container } = renderWithProviders(
      <Image
        src="image-src.png"
        alt="alt-text"
        className="inner-class"
        id="figure-id"
        caption={<div>This is the caption</div>}
        width={30}
        height={30}
      />,
    )

    const imageElement = screen.getByRole('img')
    expect(imageElement).toHaveAccessibleName('alt-text')
    expect(imageElement).toHaveAttribute('src', 'image-src.png')

    const wrapperElement = screen.getByRole('figure')
    expect(container.querySelector('#figure-id')).toEqual(wrapperElement)

    expect(container.querySelector('figcaption')).toHaveTextContent(
      'This is the caption',
    )
  })

  test('should have the correct alignment', () => {
    const { container, rerender } = renderWithProviders(
      <Image
        src="image-src.png"
        alt="alt-text"
        className="inner-class"
        align="center"
      />,
    )

    expect(container.querySelector('.inner-class')).toHaveClass('mx-auto')

    rerender(
      <Image
        src="image-src.png"
        alt="alt-text"
        className="inner-class"
        align="right"
      />,
    )

    expect(container.querySelector('.inner-class')).toHaveClass('ml-auto')

    rerender(
      <Image src="image-src.png" alt="alt-text" className="inner-class" />,
    )

    expect(container.querySelector('.inner-class')).not.toHaveClass('ml-auto')
    expect(container.querySelector('.inner-class')).not.toHaveClass('mx-auto')
  })

  test.skip('should fade in on image load', () => {
    renderWithProviders(
      <Image src="image-src" alt="alt-text" width={30} height={30} />,
    )

    const imgElement = screen.getByAltText('alt-text')

    expect(imgElement).toHaveClass('opacity-0')
    fireEvent.load(imgElement)
    expect(imgElement).not.toHaveClass('opacity-0')
  })
})
