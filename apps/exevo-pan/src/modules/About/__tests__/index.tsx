import { renderWithProviders } from 'utils/test'
import { mockCharacterData } from './mock'
import About from '..'

describe('<About />', () => {
  test('should pass smoke test', () => {
    const { container } = renderWithProviders(
      <About characterData={mockCharacterData} />,
    )

    expect(container).toBeInTheDocument()
  })
})
