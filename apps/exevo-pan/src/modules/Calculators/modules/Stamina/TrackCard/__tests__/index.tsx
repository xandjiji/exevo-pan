import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
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

  test('should call the `update` and `remove` actions', async () => {
    const mockedUpdate = jest.fn()
    const mockedRemove = jest.fn()

    renderWithProviders(
      <TrackCard
        {...props}
        trackedData={{ ...props.trackedData, name: '' }}
        update={mockedUpdate}
        remove={mockedRemove}
      />,
    )

    const inputElement = screen.getByPlaceholderText('New character (0)')
    expect(inputElement).toHaveDisplayValue('')

    userEvent.type(inputElement, 'a')
    expect(mockedUpdate).toHaveBeenCalledTimes(1)
    expect(mockedUpdate).toHaveBeenLastCalledWith({
      key: props.trackedData.key,
      name: 'a',
    })

    userEvent.click(screen.getByRole('button', { name: 'Remove item' }))

    await waitFor(() => {
      expect(mockedRemove).toHaveBeenCalledTimes(1)
      expect(mockedRemove).toHaveBeenLastCalledWith(props.trackedData.key)
    })
  })
})
