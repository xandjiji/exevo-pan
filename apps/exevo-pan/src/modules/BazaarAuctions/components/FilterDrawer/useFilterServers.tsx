import { useMemo } from 'react'

type UseFilterServersProps = {
  allServerOptions: Option[]
  filterState: FilterOptions
  serverData: Record<string, ServerObject>
}

const satisfiesSet = <T,>(set: Set<T>, value: T): boolean =>
  set.size === 0 || set.has(value)

const useFilterServers = ({
  allServerOptions,
  filterState,
  serverData,
}: UseFilterServersProps): Option[] =>
  useMemo(
    () =>
      allServerOptions.filter(({ name }) => {
        const serverOptionData = serverData[name]

        if (!satisfiesSet(filterState.battleye, serverOptionData.battleye)) {
          return false
        }

        if (!satisfiesSet(filterState.pvp, serverOptionData.pvpType.type)) {
          return false
        }

        if (
          !satisfiesSet(
            filterState.location,
            serverOptionData.serverLocation.type,
          )
        ) {
          return false
        }

        return true
      }),
    [allServerOptions, filterState, serverData],
  )

export default useFilterServers
