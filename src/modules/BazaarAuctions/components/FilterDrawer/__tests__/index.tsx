import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { imbuement, outfit } from 'DataDictionary/dictionaries'
import { renderWithProviders } from 'utils/test'
import { WrappedFilterDrawer } from './mock'

jest.mock('hooks/useIsMounted', () => jest.fn().mockReturnValue(true))

describe('<FilterDrawer />', () => {
  beforeEach(() => {
    jest.useFakeTimers()

    jest
      .spyOn(window, 'setTimeout')
      .mockImplementationOnce((fn) => fn() as unknown as NodeJS.Timeout)
  })

  test('drawer visibility should be controlled correctly', () => {
    const { rerender } = renderWithProviders(<WrappedFilterDrawer open />)

    const drawerElement = screen.getByRole('dialog')
    expect(drawerElement).toBeVisible()

    rerender(<WrappedFilterDrawer open={false} />)
    expect(drawerElement).not.toBeVisible()

    rerender(<WrappedFilterDrawer open />)
    expect(drawerElement).toBeVisible()
  })

  test('should call onClose', () => {
    const mockedOnClose = jest.fn()
    renderWithProviders(<WrappedFilterDrawer onClose={mockedOnClose} />)

    expect(mockedOnClose).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByLabelText('Close drawer'))
    expect(mockedOnClose).toHaveBeenCalledTimes(1)
  })

  test('should update filters', () => {
    renderWithProviders(<WrappedFilterDrawer />)

    const knightButton = screen.getByRole('switch', { name: 'Knight' })
    const paladinButton = screen.getByRole('switch', { name: 'Paladin' })

    expect(knightButton).not.toBeChecked()
    expect(paladinButton).not.toBeChecked()

    userEvent.click(knightButton)
    expect(knightButton).toBeChecked()
    expect(paladinButton).not.toBeChecked()

    userEvent.click(paladinButton)
    expect(knightButton).toBeChecked()
    expect(paladinButton).toBeChecked()

    const nicknameInput = screen.getByLabelText('Search nickname')
    expect(nicknameInput).toHaveValue('')
    userEvent.type(nicknameInput, 'Ksu')
    expect(nicknameInput).toHaveValue('Ksu')
  })

  test('autocomplete inputs should work correctly', () => {
    renderWithProviders(<WrappedFilterDrawer />)

    const imbuementInput = screen.getByLabelText('Imbuements')
    expect(screen.queryByText('Critical Hit')).not.toBeInTheDocument()
    userEvent.click(imbuementInput)

    userEvent.click(screen.getByRole('option', { name: 'Critical Hit' }))
    expect(screen.queryByText('Critical Hit')).toBeInTheDocument()

    userEvent.click(screen.getByLabelText('Remove item'))
    expect(screen.queryByText('Critical Hit')).not.toBeInTheDocument()

    userEvent.click(imbuementInput)
    userEvent.click(screen.getByRole('option', { name: 'Critical Hit' }))
    expect(screen.queryByText('Critical Hit')).toBeInTheDocument()

    const toggleAllButton = screen.getByRole('switch', {
      name: 'All imbuements',
    })

    userEvent.click(toggleAllButton)
    imbuement.tokens.forEach((imbuementName) => {
      expect(screen.queryByText(imbuementName)).toBeInTheDocument()
    })

    userEvent.click(toggleAllButton)
    imbuement.tokens.forEach((imbuementName) => {
      expect(screen.queryByText(imbuementName)).not.toBeInTheDocument()
    })

    userEvent.click(toggleAllButton)
    imbuement.tokens.forEach((imbuementName) => {
      expect(screen.queryByText(imbuementName)).toBeInTheDocument()
    })

    screen.getAllByLabelText('Remove item').forEach((removeButton) => {
      userEvent.click(removeButton)
      expect(removeButton).not.toBeInTheDocument()
    })
  })

  test('filter reset button should work correctly', () => {
    renderWithProviders(<WrappedFilterDrawer />)

    expect(
      screen.queryByRole('button', { name: 'Reset filters' }),
    ).not.toBeInTheDocument()

    const knightButton = screen.getByRole('switch', { name: 'Knight' })
    userEvent.click(knightButton)

    const resetFilterButton = screen.getByRole('button', {
      name: 'Reset filters',
    })
    expect(resetFilterButton).toBeVisible()

    userEvent.click(resetFilterButton)
    expect(knightButton).not.toBeChecked()
    expect(resetFilterButton).not.toBeVisible()

    userEvent.click(knightButton)
    userEvent.click(
      screen.getByRole('switch', {
        name: 'All imbuements',
      }),
    )

    expect(resetFilterButton).toBeVisible()

    userEvent.click(resetFilterButton)
    expect(knightButton).not.toBeChecked()
    imbuement.tokens.forEach((imbuementName) => {
      expect(screen.queryByText(imbuementName)).not.toBeInTheDocument()
    })
  })

  test('outfit/mount picker should work correctly', () => {
    renderWithProviders(<WrappedFilterDrawer />)

    outfit.tokens.forEach((outfitName) => {
      expect(screen.queryByTitle(outfitName)).not.toBeInTheDocument()
    })

    userEvent.click(screen.getByText('Outfits'))

    expect(
      screen.queryByRole('button', { name: 'Reset filters' }),
    ).not.toBeInTheDocument()

    outfit.tokens.forEach((outfitName) => {
      const switchElement = screen.getByTitle(outfitName)

      expect(switchElement).not.toBeChecked()
      userEvent.click(switchElement)
      expect(switchElement).toBeChecked()
    })

    const resetButton = screen.getByRole('button', { name: 'Reset filters' })
    expect(resetButton).toBeVisible()

    outfit.tokens.forEach((outfitName) => {
      const switchElement = screen.getByTitle(outfitName)

      expect(switchElement).toBeChecked()
      userEvent.click(switchElement)
      expect(switchElement).not.toBeChecked()
    })

    expect(resetButton).not.toBeVisible()

    const addonElement = screen.getByRole('checkbox', { name: 'Addon 1' })
    expect(addonElement).toBeChecked()

    userEvent.click(addonElement)
    expect(addonElement).not.toBeChecked()
    expect(resetButton).toBeVisible()

    userEvent.click(resetButton)
    expect(addonElement).toBeChecked()
    expect(resetButton).not.toBeVisible()
  })

  test('useDebouncedFilter should dispatch filters after a while', () => {
    renderWithProviders(<WrappedFilterDrawer />)

    expect(
      screen.queryByRole('button', {
        name: 'Reset filters',
      }),
    ).not.toBeInTheDocument()

    const nicknameInput = screen.getByLabelText('Search nickname')
    expect(nicknameInput).toHaveValue('')
    userEvent.type(nicknameInput, 'Ksu')
    expect(nicknameInput).toHaveValue('Ksu')

    expect(
      screen.getByRole('button', {
        name: 'Reset filters',
      }),
    ).toBeInTheDocument()
  })
})
