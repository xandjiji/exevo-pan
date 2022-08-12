import { useState } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import TimeInput from '..'

describe('<TimeInput />', () => {
  test('should be invalid', () => {
    renderWithProviders(<TimeInput label="Time" error="Invalid time" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid time')
  })

  test.todo('the hour should be capped by `max` and `min` props')

  test.todo('should be controlled (keyboard and arrow keys)')

  test.todo('should control its own value (keyboard and arrow keys)')
})
