import { db } from '../utils'

type InsertNewServersArgs = {
  storedServers: ServerObject[]
  freshServers: ServerObject[]
}

export const insertNewServers = async ({
  storedServers,
  freshServers,
}: InsertNewServersArgs): Promise<number> => {
  const storedServerNames = new Set(
    storedServers.map(({ serverName }) => serverName),
  )

  const newServers = freshServers.filter(
    ({ serverName }) => !storedServerNames.has(serverName),
  )

  if (newServers.length) await db.insertNewServers(newServers)

  return newServers.length
}
