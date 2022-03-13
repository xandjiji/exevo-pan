import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Tooltip from '..'

/*
    We are using 'await waitFor(() => {})' at the end
    of each test to get rid of unexpected warnings.
    This is a issue with react-popper. See:
    https://github.com/popperjs/react-popper/issues/368
*/

describe('<Tooltip />', () => {
  test('visibility is correctly controlled by mouse HOVER', async () => {
    renderWithProviders(
      <Tooltip trigger="hover" content={<div>tooltip content</div>}>
        <h1>wrapped</h1>
      </Tooltip>,
    )

    /*     const contentElement = screen.getByText('tooltip content') */
    const wrappedElement = screen.getByRole('heading')

    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    expect(wrappedElement).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Click here to close'),
    ).not.toBeInTheDocument()

    userEvent.hover(wrappedElement)
    expect(screen.getByText('tooltip content')).toBeVisible()

    userEvent.unhover(wrappedElement)
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()

    await waitFor(() => {})
  })

  test('visibility is correctly controlled by mouse CLICK', async () => {
    renderWithProviders(
      <Tooltip trigger="click" content={<div>tooltip content</div>}>
        <h1>wrapped</h1>
      </Tooltip>,
    )

    /* const contentElement = screen.getByText('tooltip content') */
    const wrappedElement = screen.getByRole('heading')

    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    expect(wrappedElement).toBeInTheDocument()

    userEvent.click(wrappedElement)
    let contentElement = screen.getByText('tooltip content')
    expect(contentElement).toBeVisible()
    userEvent.click(contentElement)
    expect(contentElement).toBeVisible()

    userEvent.click(wrappedElement)
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()

    userEvent.click(wrappedElement)
    contentElement = screen.getByText('tooltip content')
    expect(contentElement).toBeVisible()
    userEvent.click(screen.getByLabelText('Click here to close'))
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()

    await waitFor(() => {})
  })

  test('HOVER visibility is correctly controlled by KEYBOARD', async () => {
    renderWithProviders(
      <Tooltip trigger="hover" content={<div>tooltip content</div>}>
        <h1>wrapped</h1>
      </Tooltip>,
    )

    /* const contentElement = screen.getByText('tooltip content') */

    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Click here to close'),
    ).not.toBeInTheDocument()

    userEvent.tab()
    expect(screen.getByText('tooltip content')).toBeVisible()

    userEvent.tab()
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()

    userEvent.tab()
    expect(screen.getByText('tooltip content')).toBeVisible()

    await waitFor(() => {})
  })

  test('CLICK visibility is correctly controlled by KEYBOARD', async () => {
    renderWithProviders(
      <Tooltip trigger="click" content={<div>tooltip content</div>}>
        <h1>wrapped</h1>
      </Tooltip>,
    )

    /* const contentElement = screen.getByText('tooltip content') */
    const wrappedElement = screen.getByRole('heading')

    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    expect(wrappedElement).toBeInTheDocument()

    userEvent.tab()
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    userEvent.keyboard('{enter}')
    expect(screen.getByText('tooltip content')).toBeVisible()
    userEvent.type(wrappedElement, '{space}')
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()

    await waitFor(() => {})
  })

  test('should be controlled correctly', async () => {
    const { rerender } = renderWithProviders(
      <Tooltip trigger="none" visible content={<div>tooltip content</div>}>
        <h1>wrapped</h1>
      </Tooltip>,
    )

    const contentElement = screen.getByText('tooltip content')
    const wrappedElement = screen.getByRole('heading')

    expect(contentElement).toBeInTheDocument()
    expect(wrappedElement).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Click here to close'),
    ).not.toBeInTheDocument()

    expect(contentElement).toBeVisible()

    userEvent.tab()
    expect(contentElement).toBeVisible()
    userEvent.keyboard('{enter}')
    expect(contentElement).toBeVisible()
    userEvent.type(wrappedElement, '{space}')
    expect(contentElement).toBeVisible()

    userEvent.click(wrappedElement)
    expect(contentElement).toBeVisible()
    userEvent.click(wrappedElement)
    expect(contentElement).toBeVisible()
    userEvent.click(contentElement)
    expect(contentElement).toBeVisible()

    rerender(
      <Tooltip
        trigger="none"
        visible={false}
        content={<div>tooltip content</div>}
      >
        <h1>wrapped</h1>
      </Tooltip>,
    )

    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    expect(wrappedElement).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Click here to close'),
    ).not.toBeInTheDocument()

    userEvent.tab()
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    userEvent.keyboard('{enter}')
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    userEvent.type(wrappedElement, '{space}')
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()

    userEvent.click(wrappedElement)
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    userEvent.click(wrappedElement)
    expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()

    await waitFor(() => {})
  })
})
