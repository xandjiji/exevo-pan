import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Tags from '..'

describe('<Tags />', () => {
  test('should render all tags', () => {
    const tagNames = ['tag A', 'tag B', 'tag C']
    renderWithProviders(<Tags tags={tagNames} />)

    tagNames.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })

  test('if there are no tags, it should render nothing', () => {
    const { container } = renderWithProviders(<Tags tags={[]} />)
    expect(container.childElementCount).toBe(1)
  })
})
