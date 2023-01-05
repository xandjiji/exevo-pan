import { DrawerFieldsProvider } from '../../../contexts/useDrawerFields'
import { AuctionsProvider } from '../../../contexts/useAuctions'
import FilterDrawer from '..'
import { FilterDrawerProps } from '../types'

export const activeServers = new Set(['Funera', 'Belobra', 'Antica'])

export const WrappedFilterDrawer = ({
  open = true,
  onClose = jest.fn(),
}: Partial<FilterDrawerProps>) => (
  <DrawerFieldsProvider
    activeServers={activeServers}
    rareItemData={{ 'Ball Gown': [1], 'Amazon Shield': [2, 3] }}
    serverData={{
      Antica: {
        serverId: 1,
        serverName: 'Antica',
        serverLocation: {
          string: 'EU',
          type: 0,
        },
        pvpType: {
          string: 'Open',
          type: 1,
        },
        battleye: false,
        experimental: false,
      },
      Belobra: {
        serverId: 5,
        serverName: 'Belobra',
        serverLocation: {
          string: 'BR',
          type: 2,
        },
        pvpType: {
          string: 'Optional',
          type: 0,
        },
        battleye: false,
        experimental: false,
      },
      Funera: {
        serverId: 23,
        serverName: 'Funera',
        serverLocation: {
          string: 'NA',
          type: 1,
        },
        pvpType: {
          string: 'Retro Hardcore',
          type: 4,
        },
        battleye: true,
        experimental: false,
      },
    }}
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
