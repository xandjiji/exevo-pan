import { DrawerFieldsProvider } from '../../../contexts/useDrawerFields'
import { AuctionsProvider } from '../../../contexts/useAuctions'
import FilterDrawer from '..'
import { FilterDrawerProps } from '../types'

export const activeServers = new Set(['Pacera', 'Belobra', 'Antica'])

export const WrappedFilterDrawer = ({
  open = true,
  onClose = jest.fn(),
}: Partial<FilterDrawerProps>) => (
  <DrawerFieldsProvider
    activeServers={activeServers}
    rareItemData={{ 'Ball Gown': [1], 'Amazon Shield': [2, 3] }}
    serverOptions={[]}
  >
    <AuctionsProvider
      highlightedAuctions={[]}
      initialPaginatedData={{
        page: [],
        endOffset: 0,
        hasNext: false,
        hasPrev: false,
        pageIndex: 0,
        startOffset: 0,
        totalItems: 0,
        sortingMode: 0,
        descendingOrder: true,
      }}
    >
      <FilterDrawer open={open} onClose={onClose} />
    </AuctionsProvider>
  </DrawerFieldsProvider>
)
