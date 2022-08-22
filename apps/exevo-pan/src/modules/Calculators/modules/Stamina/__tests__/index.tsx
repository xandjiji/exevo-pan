import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { doTimes } from 'utils'
import { renderWithProviders } from 'utils/test'
import Stamina from '..'

const setup = () => {
  const [currentHours, desiredHours] = screen.getAllByLabelText('hours')
  const [currentMinutes, desiredMinutes] = screen.getAllByLabelText('minutes')

  const inputs = {
    current: { hours: currentHours, minutes: currentMinutes },
    desired: { hours: desiredHours, minutes: desiredMinutes },
  }

  const button = screen.getByRole('button', { name: 'Track' })

  const action = {
    inc: (element: HTMLElement) => userEvent.type(element, '{arrowup}'),
    dec: (element: HTMLElement) => userEvent.type(element, '{arrowdown}'),
  }

  return { inputs, button, action }
}

describe('<Stamina />', () => {
  test('should calculate everything correctly and track data', () => {
    renderWithProviders(<Stamina />)

    const { inputs, button, action } = setup()

    doTimes(() => action.dec(inputs.current.hours), 5)
    doTimes(() => action.inc(inputs.current.minutes), 7)

    doTimes(() => action.dec(inputs.desired.hours), 2)
    doTimes(() => action.inc(inputs.desired.minutes), 18)

    const staminaBar = screen.getByTitle('40:18')
    expect(staminaBar).toBeInTheDocument()
    expect(staminaBar.previousSibling?.textContent).toEqual('34:07')

    expect(screen.getByText('22')).toBeInTheDocument()
    expect(screen.getByText('27')).toBeInTheDocument()

    userEvent.click(button)
  })

  test('should be invalid', () => {
    renderWithProviders(<Stamina />)

    const { inputs, button, action } = setup()
    const currentStaminaElement = screen.getByLabelText('Current stamina')
    const desiredStaminaElement = screen.getByLabelText('Desired stamina')

    doTimes(() => action.dec(inputs.current.hours), 2)
    doTimes(() => action.inc(inputs.current.minutes), 7)
    doTimes(() => action.dec(inputs.desired.hours), 5)
    expect(currentStaminaElement).toBeInvalid()
    expect(desiredStaminaElement).toBeInvalid()
    expect(button).toBeDisabled()

    doTimes(() => action.inc(inputs.desired.minutes), 8)
    expect(currentStaminaElement).toBeValid()
    expect(desiredStaminaElement).toBeValid()
    expect(button).toBeEnabled()
  })
})
