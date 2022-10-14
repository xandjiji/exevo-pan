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

  const newServers = storedServers.filter(
    ({ serverName }) => !freshServerNames.has(serverName),
  )

  if (newServers.length) {
    await db.updateInactiveServers(
      newServers.map(({ serverName }) => serverName),
    )
  }

  return newServers.length
}
