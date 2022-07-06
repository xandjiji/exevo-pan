import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Label from '..'

describe('<Label />', () => {
  test('should render correctly', () => {
    renderWithProviders(
      <Label>
        Label text
        <input value="my name" />
      </Label>,
    )

    expect(screen.getByLabelText('Label text')).toHaveValue('my name')
  })
})
