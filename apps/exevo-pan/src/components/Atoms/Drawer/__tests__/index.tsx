import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Drawer from '..'

jest.mock('hooks/useIsMounted', () => jest.fn().mockReturnValue(true))

const mockOnClose = jest.fn()

const DrawerComponent = ({ open = false }: { open: boolean }): JSX.Element => (
  <Drawer data-testid="drawer-id" isOpen={open} onClose={mockOnClose}>
    <Drawer.Head onClose={mockOnClose}>head</Drawer.Head>
    <Drawer.Body>body</Drawer.Body>
    <Drawer.Footer>footer</Drawer.Footer>
  </Drawer>
)

describe('<Drawer />', () => {
  beforeEach(() => {
    mockOnClose.mockClear()

    jest
      .spyOn(window, 'setTimeout')
      .mockImplementation((fn) => fn() as unknown as NodeJS.Timeout)
  })

  test('should render children content', () => {
    renderWithProviders(<DrawerComponent open />)

    expect(screen.getByText('head')).toBeInTheDocument()
    expect(screen.getByText('body')).toBeInTheDocument()
    expect(screen.getByText('footer')).toBeInTheDocument()
  })

  test('should toggle state correctly', () => {
    const { rerender } = renderWithProviders(<DrawerComponent open={false} />)

    expect(screen.queryByTestId('drawer-id')).not.toBeInTheDocument()

    rerender(<DrawerComponent open />)
    expect(screen.getByTestId('drawer-id')).toBeVisible()
  })

  test('should call onClose with ESC key', () => {
    renderWithProviders(<DrawerComponent open />)

    expect(mockOnClose).toBeCalledTimes(0)
    userEvent.keyboard('{esc}')
    expect(mockOnClose).toBeCalledTimes(1)
  })

  test('should call onClose on arrow click', () => {
    renderWithProviders(<DrawerComponent open />)

    expect(mockOnClose).toBeCalledTimes(0)
    userEvent.click(screen.getByRole('button'))
    expect(mockOnClose).toBeCalledTimes(1)
  })
})
