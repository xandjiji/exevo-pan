import { db } from '../utils'

type UpdateInactiveServersArgs = {
  storedServers: ServerObject[]
  freshServers: ServerObject[]
}

export const updateInactiveServers = async ({
  storedServers,
  freshServers,
}: UpdateInactiveServersArgs): Promise<number> => {
  const storedServerNames = new Set(
    storedServers.map(({ serverName }) => serverName),
  )

  const newServers = freshServers.filter(
    ({ serverName }) => !storedServerNames.has(serverName),
  )

  if (newServers.length) {
    await db.updateInactiveServers(
      newServers.map(({ serverName }) => serverName),
    )
  }

  return newServers.length
}
