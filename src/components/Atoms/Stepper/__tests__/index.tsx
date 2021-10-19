import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import userEvent from '@testing-library/user-event'
import Stepper from '..'

const mockedClickHandlers = [jest.fn(), jest.fn(), jest.fn()]

const mockedSteps = [
  {
    title: 'First step',
    icon: <span>first icon</span>,
    onClick: mockedClickHandlers[0],
  },
  {
    title: 'Second step',
    icon: 'secondIcon',
    onClick: mockedClickHandlers[1],
  },
  {
    title: 'Third step',
    onClick: mockedClickHandlers[2],
  },
  { title: 'Fourth step', icon: <span>fourth icon</span> },
]

describe('<Stepper />', () => {
  test('should render all steps correctly', () => {
    renderWithProviders(<Stepper currentStep={0} steps={mockedSteps} />)

    mockedSteps.forEach((step) => {
      expect(
        screen.getByRole('heading', { name: step.title }),
      ).toBeInTheDocument()
    })
    expect(screen.getByText('first icon')).toBeInTheDocument()
    expect(screen.getByText('secondIcon')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('fourth icon')).toBeInTheDocument()
  })

  test.todo('should call click functions onClick')

  test.todo('should call click functions on keyboard navigation')

  test.todo('should mark completed steps')
})
