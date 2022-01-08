import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import FilterGroup from '..'

describe('<FilterGroup />', () => {
  test('should label element correctly', () => {
    renderWithProviders(
      <FilterGroup label="Input label" htmlFor="input-id">
        <input id="input-id" value="input value" />
      </FilterGroup>,
    )

    expect(screen.getByLabelText('Input label')).toHaveValue('input value')
  })

  test('should add a label suffix correctly', () => {
    renderWithProviders(
      <FilterGroup
        label="Input label"
        htmlFor="input-id"
        labelSuffix={<div role="none" />}
      >
        <input id="input-id" value="input value" />
      </FilterGroup>,
    )

    expect(screen.getByLabelText('Input label')).toHaveValue('input value')
    expect(screen.getByRole('none')).toBeInTheDocument()
  })
})
