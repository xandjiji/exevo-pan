import { DrawerFieldsProvider } from '../../../contexts/useDrawerFields'
import { FiltersProvider } from '../../../contexts/useFilters'
import FilterDrawer from '..'
import { FilterDrawerProps } from '../types'

export const WrappedFilterDrawer = ({
  open = true,
  onClose = jest.fn(),
}: Partial<FilterDrawerProps>) => (
  <DrawerFieldsProvider rareItemData={{}} serverOptions={[]}>
    <FiltersProvider>
      <FilterDrawer open={open} onClose={onClose} />
    </FiltersProvider>
  </DrawerFieldsProvider>
)
