import { db } from '../utils'

type UpdateInactiveServersArgs = {
  storedServers: ServerObject[]
  freshServers: ServerObject[]
}

export const updateInactiveServers = async ({
  storedServers,
  freshServers,
}: UpdateInactiveServersArgs): Promise<number> => {
  const freshServerNames = new Set(
    freshServers.map(({ serverName }) => serverName),
  )

  const inactiveServers = storedServers.filter(
    ({ serverName, active }) => active && !freshServerNames.has(serverName),
  )

  if (inactiveServers.length) {
    await db.updateInactiveServers(
      inactiveServers.map(({ serverName }) => serverName),
    )
  }

  return inactiveServers.length
}
