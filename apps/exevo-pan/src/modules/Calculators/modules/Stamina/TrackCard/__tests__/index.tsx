import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import userEvent from '@testing-library/user-event'
import { TrackCardProps } from '../types'
import TrackCard from '..'

const props: TrackCardProps = {
  index: 0,
  trackedData: {
    key: '12e6cd11-d855-40a4-ae6e-1e50d50fcc36',
    name: 'Ksu',
    timestamp: +new Date(),
    targetStamina: {
      time: '41:19',
      seconds: 148740,
    },
    currentStamina: {
      time: '36:22',
      seconds: 130920,
    },
  },
  remove: jest.fn(),
  update: jest.fn(),
}

describe('<TrackCard />', () => {
  test('should render the correct tracked data', () => {
    renderWithProviders(<TrackCard {...props} />)

    expect(screen.getByDisplayValue('Ksu')).toBeInTheDocument()
    expect(screen.getByText('3622')).toBeInTheDocument()
    expect(screen.getByTitle('41:19')).toBeInTheDocument()

    expect(screen.getByText('21')).toBeInTheDocument()
    expect(screen.getByText('48')).toBeInTheDocument()
  })

  test('should allow to customize the character name', () => {
    renderWithProviders(
      <TrackCard {...props} trackedData={{ ...props.trackedData, name: '' }} />,
    )

    const inputElement = screen.getByPlaceholderText('New character (0)')
    expect(inputElement).toHaveDisplayValue('')

    userEvent.type(inputElement, 'my character')
    expect(inputElement).toHaveDisplayValue('my character')
  })

  test.todo('should call the `update` and `remove` actions')
})
