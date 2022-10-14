import { prisma, HttpClient } from 'services'
import { ServerList } from 'Helpers'
import { retryWrapper } from 'utils'

const URL = {
  SERVER_LIST: 'https://www.tibia.com/community/?subtopic=worlds',
  KILL_STATISTICS: 'https://www.tibia.com/community/?subtopic=killstatistics',
}

export const fetchServerPage = retryWrapper(async () => {
  const helper = new ServerList()
  return helper.servers(await HttpClient.getHtml(URL.SERVER_LIST))
})

export const db = {
  getAllServers: retryWrapper(prisma.server.findMany),
  updateInactiveServers: retryWrapper((serverNames: string[]) =>
    prisma.server.updateMany({
      where: { serverName: { in: serverNames } },
      data: { active: false },
    }),
  ),
  insertNewServers: retryWrapper((servers: ServerObject[]) =>
    prisma.server.createMany({ data: servers }),
  ),
}
