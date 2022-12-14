import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import FadeImage from '..'

describe('<FadeImage />', () => {
  test.skip('should fade in on image load', () => {
    renderWithProviders(
      <FadeImage
        src="image-src"
        className="image-wrapper"
        alt="alt-text"
        width={30}
        height={30}
      />,
    )

    const imgElement = screen.getByAltText('alt-text')

    expect(imgElement).toHaveClass('opacity-0')
    fireEvent.load(imgElement)
    expect(imgElement).not.toHaveClass('opacity-0')
  })
})
