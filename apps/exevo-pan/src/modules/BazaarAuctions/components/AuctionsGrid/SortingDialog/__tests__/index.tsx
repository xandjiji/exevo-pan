import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { PopoverProps } from 'components/Atoms/Popover/types'
import { useAuctions } from '../../../../contexts/useAuctions'
import { AuctionsContextValues } from '../../../../contexts/useAuctions/types'
import SortingDialog from '..'

jest.mock('../../../../contexts/useAuctions', () => ({
  useAuctions: jest.fn(),
}))

jest.mock('components/Organisms', () => ({
  Tooltip: ({ children, content }: PopoverProps) => (
    <>
      {children}
      {content}
    </>
  ),
}))

const mockedUseAuctions = useAuctions as jest.MockedFunction<typeof useAuctions>
const mockedDispatch = jest.fn()

describe('<SortingDialog />', () => {
  beforeEach(() => {
    mockedDispatch.mockClear()
    mockedUseAuctions.mockClear()
    mockedUseAuctions.mockImplementation(
      () =>
        ({
          sortingOptions: { sortingMode: 0, descendingOrder: false },
          dispatch: mockedDispatch,
        } as unknown as AuctionsContextValues),
    )
  })
  test('should dispatch functions from useAuctions', () => {
    renderWithProviders(<SortingDialog />)

    expect(mockedDispatch).toHaveBeenCalledTimes(0)

    const switchElement = screen.getByRole('switch')
    userEvent.click(switchElement)
    expect(mockedDispatch).toHaveBeenCalledTimes(1)

    const [radioA, radioB] = screen.getAllByRole('radio')
    userEvent.click(radioA)
    expect(mockedDispatch).toHaveBeenCalledTimes(2)
    userEvent.click(radioB)
    expect(mockedDispatch).toHaveBeenCalledTimes(3)
  })
})
