import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import LabelGroup from '..'

describe('<LabelGroup />', () => {
  test('should render all elements correctly', () => {
    renderWithProviders(
      <LabelGroup label="Group label" htmlFor="form-id">
        <div role="none" />
      </LabelGroup>,
    )

    expect(screen.getByText('Group label')).toHaveAttribute('for', 'form-id')
    expect(screen.getByRole('none')).toBeInTheDocument()
  })
})
