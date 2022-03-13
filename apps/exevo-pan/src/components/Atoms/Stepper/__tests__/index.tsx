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

  test('should call click functions onClick', () => {
    renderWithProviders(<Stepper currentStep={1} steps={mockedSteps} />)

    mockedSteps.forEach((step) => {
      userEvent.click(screen.getByRole('heading', { name: step.title }))
      if (step.onClick) {
        expect(step.onClick).toHaveBeenCalledTimes(1)
      }
    })
  })

  test('should call click functions on keyboard navigation', () => {
    renderWithProviders(<Stepper currentStep={1} steps={mockedSteps} />)

    mockedSteps.forEach((step) => {
      userEvent.tab()
      userEvent.keyboard('{space}')
      if (step.onClick) {
        expect(step.onClick).toHaveBeenCalled()
      }
    })
  })

  test('should mark completed steps', () => {
    let currentStep = 0
    const { rerender } = renderWithProviders(
      <Stepper currentStep={currentStep} steps={mockedSteps} />,
    )

    const buttons = screen.getAllByRole('button')

    mockedSteps.forEach((step, index) => {
      expect(buttons[index]).toHaveAttribute(
        'aria-labelledby',
        `step-item-${step.title}`,
      )
    })

    const verifyCurrentAria = () => {
      mockedSteps.forEach((_, index) => {
        const currentButton = buttons[index]
        if (index === currentStep) {
          expect(currentButton).toHaveAttribute('aria-current', 'step')
        } else {
          expect(currentButton).not.toHaveAttribute('aria-current', 'step')
        }

        if (index < currentStep) {
          expect(currentButton).toHaveAttribute('data-completed', 'true')
        }
      })
      currentStep += 1
      rerender(<Stepper currentStep={currentStep} steps={mockedSteps} />)
    }

    verifyCurrentAria()
    verifyCurrentAria()
    verifyCurrentAria()
    verifyCurrentAria()
  })
})
