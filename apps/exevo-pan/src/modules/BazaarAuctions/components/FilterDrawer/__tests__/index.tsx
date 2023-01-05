import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as imbuement from 'data-dictionary/dist/dictionaries/imbuement'
import * as outfit from 'data-dictionary/dist/dictionaries/outfit'
import { renderWithProviders, setup } from 'utils/test'
import { WrappedFilterDrawer } from './mock'

jest.mock('hooks/useIsMounted', () => jest.fn().mockReturnValue(true))

setup.useSession().mockReturnValue({
  data: {
    user: {
      proStatus: true,
    },
  } as any,
  status: 'unauthenticated',
})
setup.fetch().mockResolvedValue({
  json: async () => null,
} as Response)

describe('<FilterDrawer />', () => {
  beforeEach(() => {
    jest.useFakeTimers()

    jest
      .spyOn(window, 'setTimeout')
      .mockImplementationOnce((fn) => fn() as unknown as NodeJS.Timeout)
  })

  const resetFilters = () => {
    const resetButton = screen.queryByRole('button', {
      name: 'Reset filters',
    })

    if (resetButton) userEvent.click(resetButton)
  }

  test('drawer visibility should be controlled correctly', async () => {
    const { rerender } = renderWithProviders(<WrappedFilterDrawer open />)

    expect(screen.getByRole('dialog')).toBeVisible()

    rerender(<WrappedFilterDrawer open={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    rerender(<WrappedFilterDrawer open />)
    expect(screen.getByRole('dialog')).toBeVisible()
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
    resetFilters()

    expect(
      screen.queryByRole('button', { name: 'Reset filters' }),
    ).not.toBeInTheDocument()

    const knightButton = screen.getByRole('switch', { name: 'Knight' })
    userEvent.click(knightButton)

    const resetFilterButton = screen.getByRole('button', {
      name: 'Reset filters',
    })
    expect(resetFilterButton).toBeEnabled()

    userEvent.click(resetFilterButton)
    expect(knightButton).not.toBeChecked()
    expect(resetFilterButton).toBeDisabled()

    userEvent.click(knightButton)
    userEvent.click(
      screen.getByRole('switch', {
        name: 'All imbuements',
      }),
    )

    expect(resetFilterButton).toBeEnabled()

    userEvent.click(resetFilterButton)
    expect(knightButton).not.toBeChecked()
    imbuement.tokens.forEach((imbuementName) => {
      expect(screen.queryByText(imbuementName)).not.toBeInTheDocument()
    })
  })

  test('outfit/mount picker should work correctly', () => {
    renderWithProviders(<WrappedFilterDrawer />)
    resetFilters()

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
    expect(resetButton).toBeEnabled()

    outfit.tokens.forEach((outfitName) => {
      const switchElement = screen.getByTitle(outfitName)

      expect(switchElement).toBeChecked()
      userEvent.click(switchElement)
      expect(switchElement).not.toBeChecked()
    })

    expect(resetButton).toBeDisabled()

    const addonElement = screen.getByRole('checkbox', { name: 'Addon 1' })
    expect(addonElement).toBeChecked()

    userEvent.click(addonElement)
    expect(addonElement).not.toBeChecked()
    expect(resetButton).toBeEnabled()

    userEvent.click(resetButton)
    expect(addonElement).toBeChecked()
    expect(resetButton).toBeDisabled()
  })

  test('useDebouncedFilter should dispatch filters after a while', () => {
    renderWithProviders(<WrappedFilterDrawer />)
    resetFilters()

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

  test('useDebouncedFilter should dispatch filters after a while', () => {
    renderWithProviders(<WrappedFilterDrawer />)
    resetFilters()

    const minInput = screen.getByLabelText('Min level')
    const maxInput = screen.getByLabelText('Max level')

    const assertResetButton = (visible: boolean) => {
      if (visible) {
        expect(
          screen.getByRole('button', {
            name: 'Reset filters',
          }),
        ).toBeInTheDocument()
      } else {
        expect(
          screen.queryByRole('button', {
            name: 'Reset filters',
          }),
        ).not.toBeInTheDocument()
      }
    }

    const assertValid = (valid: boolean) => {
      const validity = valid ? 'false' : 'true'
      expect(minInput).toHaveAttribute('aria-invalid', validity)
      expect(maxInput).toHaveAttribute('aria-invalid', validity)
    }

    assertResetButton(false)

    expect(minInput).toHaveValue(0)
    userEvent.clear(minInput)
    expect(minInput).toHaveValue(null)
    assertResetButton(false)

    userEvent.type(minInput, '2999')
    assertResetButton(true)
    expect(minInput).toHaveValue(2999)
    assertValid(true)

    userEvent.type(minInput, '0')
    expect(minInput).toHaveValue(29990)
    assertValid(false)
    assertResetButton(true)

    userEvent.type(maxInput, '30000')
    assertValid(true)
    assertResetButton(true)

    userEvent.clear(maxInput)
    assertResetButton(true)

    userEvent.clear(minInput)
    assertValid(true)
    assertResetButton(false)
  })

  test('autocomplete inputs should work correctly', () => {
    renderWithProviders(<WrappedFilterDrawer />)

    const rareitemsInput = screen.getByLabelText('Rare items')
    expect(screen.queryByText('Ball Gown')).not.toBeInTheDocument()
    userEvent.click(rareitemsInput)

    userEvent.click(screen.getByRole('option', { name: 'Ball Gown' }))
    expect(screen.queryByText('Ball Gown')).toBeInTheDocument()

    userEvent.click(screen.getByLabelText('Remove item'))
    expect(screen.queryByText('Ball Gown')).not.toBeInTheDocument()

    userEvent.click(rareitemsInput)
    userEvent.click(screen.getByRole('option', { name: 'Ball Gown' }))
    expect(screen.queryByText('Ball Gown')).toBeInTheDocument()

    const toggleAllButton = screen.getByRole('switch', {
      name: 'All items',
    })

    userEvent.click(toggleAllButton)
    expect(screen.queryByText('Ball Gown')).toBeInTheDocument()
    expect(screen.queryByText('Amazon Shield')).toBeInTheDocument()

    userEvent.click(toggleAllButton)
    expect(screen.queryByText('Ball Gown')).not.toBeInTheDocument()
    expect(screen.queryByText('Amazon Shield')).not.toBeInTheDocument()

    userEvent.click(toggleAllButton)
    expect(screen.queryByText('Ball Gown')).toBeInTheDocument()
    expect(screen.queryByText('Amazon Shield')).toBeInTheDocument()
  })

  test('text-based search sprite picker', () => {
    renderWithProviders(<WrappedFilterDrawer />)
    resetFilters()

    userEvent.click(screen.getByText('Outfits'))

    outfit.tokens.forEach((outfitName) => {
      expect(screen.getByTitle(outfitName)).toBeInTheDocument()
    })

    const query = 'mage'
    const searchElement = screen.getByLabelText('Search by name')
    userEvent.type(searchElement, query)

    const filteredOutfits = new Set(
      outfit.tokens.filter((outfitName) =>
        outfitName.toLowerCase().includes(query),
      ),
    )

    outfit.tokens.forEach((outfitName) => {
      if (filteredOutfits.has(outfitName)) {
        expect(screen.getByTitle(outfitName)).toBeInTheDocument()
      } else {
        expect(screen.queryByTitle(outfitName)).not.toBeInTheDocument()
      }
    })

    userEvent.clear(searchElement)

    outfit.tokens.forEach((outfitName) => {
      expect(screen.getByTitle(outfitName)).toBeInTheDocument()
    })
  })

  test('pro disabled fields', () => {
    setup
      .useSession()
      .mockClear()
      .mockReturnValue({
        data: {
          user: {
            proStatus: false,
          },
        } as any,
        status: 'unauthenticated',
      })

    renderWithProviders(<WrappedFilterDrawer />)
    resetFilters()

    expect(screen.getByLabelText('Rare items')).toBeDisabled()
    expect(screen.getByLabelText('Tibia Coins invested')).toBeDisabled()

    userEvent.click(screen.getByText('Store Outfits', { exact: false }))
    expect(screen.getByLabelText('Search by name')).toBeDisabled()
    expect(screen.getByRole('checkbox', { name: 'Addon 1' })).toBeDisabled()
    expect(screen.getByRole('checkbox', { name: 'Addon 2' })).toBeDisabled()
    expect(screen.getByTitle('Entrepreneur')).toBeDisabled()
  })

  test('should filter server options according to other server filters', () => {
    renderWithProviders(<WrappedFilterDrawer />)
    resetFilters()

    const checkOption = (name: string, available = true) => {
      const optionElement = screen.queryByRole('option', { name })

      if (available) {
        expect(optionElement).toBeInTheDocument()
      } else {
        expect(optionElement).not.toBeInTheDocument()
      }
    }

    const serverInput = screen.getByLabelText('Server')
    userEvent.click(serverInput)
    checkOption('Antica')
    checkOption('Belobra')
    checkOption('Funera')

    const optionalButton = screen.getByRole('switch', { name: 'Optional' })

    userEvent.click(optionalButton)
    checkOption('Antica', false)
    checkOption('Belobra')
    checkOption('Funera', false)

    userEvent.click(optionalButton)
    const greenButton = screen.getByRole('switch', { name: 'Green' })
    userEvent.click(greenButton)
    checkOption('Antica', false)
    checkOption('Belobra', false)
    checkOption('Funera')

    userEvent.click(greenButton)
    const euButton = screen.getByRole('switch', { name: 'EU' })
    userEvent.click(euButton)
    checkOption('Antica')
    checkOption('Belobra', false)
    checkOption('Funera', false)
  })

  test('should disable filter `<Select />` if no option is available', () => {
    renderWithProviders(<WrappedFilterDrawer />)
    resetFilters()

    userEvent.click(screen.getByRole('switch', { name: 'Optional' }))
    userEvent.click(screen.getByRole('switch', { name: 'Green' }))
    userEvent.click(screen.getByRole('switch', { name: 'EU' }))

    expect(screen.getByLabelText('Server')).toBeDisabled()
  })
})
