import { useMemo } from 'react'

type UseFilterServersProps = {
  allServerOptions: Option[]
  filterState: FilterOptions
  serverData: Record<string, ServerObject>
}

const useFilterServers = ({
  allServerOptions,
  filterState,
  serverData,
}: UseFilterServersProps): Option[] =>
  useMemo(
    () =>
      allServerOptions.filter(({ name }) => {
        const serverOptionData = serverData[name]

        if (
          filterState.battleye.size &&
          !filterState.battleye.has(serverOptionData.battleye)
        ) {
          return false
        }

        if (
          filterState.pvp.size &&
          !filterState.pvp.has(serverOptionData.pvpType.type)
        ) {
          return false
        }

        if (
          filterState.location.size &&
          !filterState.location.has(serverOptionData.serverLocation.type)
        ) {
          return false
        }

        return true
      }),
    [allServerOptions, filterState, serverData],
  )

export default useFilterServers
