import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Popover from '..'

/*
    We are using 'await waitFor(() => {})' at the end
    of each test to get rid of unexpected warnings.
    This is a issue with react-popper. See:
    https://github.com/popperjs/react-popper/issues/368
*/

describe('<Popover />', () => {
  test('visibility is correctly controlled by mouse HOVER', async () => {
    renderWithProviders(
      <Popover trigger="hover" content={<div role="none" />}>
        <h1>wrapped</h1>
      </Popover>,
    )

    const wrappedElement = screen.getByRole('heading')

    expect(screen.queryByRole('none')).not.toBeInTheDocument()
    expect(wrappedElement).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Click here to close'),
    ).not.toBeInTheDocument()

    userEvent.hover(wrappedElement)
    const contentElement = screen.getByRole('none')
    expect(contentElement).toBeVisible()

    userEvent.unhover(wrappedElement)
    expect(contentElement).not.toBeVisible()

    await waitFor(() => {})
  })

  test('visibility is correctly controlled by mouse CLICK', async () => {
    renderWithProviders(
      <Popover trigger="click" content={<div role="none" />}>
        <h1>wrapped</h1>
      </Popover>,
    )

    const wrappedElement = screen.getByRole('heading')

    expect(screen.queryByRole('none')).not.toBeInTheDocument()
    expect(wrappedElement).toBeInTheDocument()

    userEvent.click(wrappedElement)
    const contentElement = screen.getByRole('none')
    expect(contentElement).toBeVisible()
    userEvent.click(contentElement)
    expect(contentElement).toBeVisible()

    userEvent.click(wrappedElement)
    expect(screen.queryByRole('none')).not.toBeInTheDocument()

    userEvent.click(wrappedElement)
    expect(screen.getByRole('none')).toBeVisible()

    userEvent.click(screen.getByLabelText('Click here to close'))
    expect(screen.queryByRole('none')).not.toBeInTheDocument()

    await waitFor(() => {})
  })

  test('HOVER visibility is correctly controlled by KEYBOARD', async () => {
    renderWithProviders(
      <Popover trigger="hover" content={<div role="none" />}>
        <h1>wrapped</h1>
      </Popover>,
    )

    expect(screen.queryByRole('none')).not.toBeInTheDocument()
    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Click here to close'),
    ).not.toBeInTheDocument()

    userEvent.tab()
    expect(screen.getByRole('none')).toBeVisible()

    userEvent.tab()
    expect(screen.queryByRole('none')).not.toBeInTheDocument()

    userEvent.tab()
    expect(screen.getByRole('none')).toBeVisible()

    await waitFor(() => {})
  })

  test('CLICK visibility is correctly controlled by KEYBOARD', async () => {
    renderWithProviders(
      <Popover trigger="click" content={<div role="none" />}>
        <h1>wrapped</h1>
      </Popover>,
    )

    const wrappedElement = screen.getByRole('heading')

    expect(screen.queryByRole('none')).not.toBeInTheDocument()
    expect(wrappedElement).toBeInTheDocument()

    userEvent.tab()
    userEvent.keyboard('{enter}')
    const contentElement = screen.getByRole('none')
    expect(contentElement).toBeVisible()
    userEvent.type(wrappedElement, '{space}')
    expect(contentElement).not.toBeVisible()

    await waitFor(() => {})
  })

  test('visibility is correctly controlled', async () => {
    const { rerender } = renderWithProviders(
      <Popover trigger="none" visible content={<div role="none" />}>
        <h1>wrapped</h1>
      </Popover>,
    )

    const contentElement = screen.getByRole('none')
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
      <Popover trigger="none" visible={false} content={<div role="none" />}>
        <h1>wrapped</h1>
      </Popover>,
    )

    expect(
      screen.queryByLabelText('Click here to close'),
    ).not.toBeInTheDocument()

    expect(contentElement).not.toBeVisible()

    userEvent.tab()
    expect(contentElement).not.toBeVisible()
    userEvent.keyboard('{enter}')
    expect(contentElement).not.toBeVisible()
    userEvent.type(wrappedElement, '{space}')
    expect(contentElement).not.toBeVisible()

    userEvent.click(wrappedElement)
    expect(contentElement).not.toBeVisible()
    userEvent.click(wrappedElement)
    expect(contentElement).not.toBeVisible()

    await waitFor(() => {})
  })
})
