/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { broadcast, tabBroadcast, TrackETA } from 'logging'
import { RevalidateClient } from 'services'
import { retryWrapper } from 'utils'

const ROUTE_PATH = 'boss-tracker'

const revalidateServer = retryWrapper((serverName?: string) =>
  RevalidateClient.route(
    `${ROUTE_PATH}${serverName ? '/' : ''}${serverName ?? ''}`,
  ),
)

export const revalidatePages = async (
  serverList: ServerObject[],
): Promise<void> => {
  broadcast('Revalidating pages', 'highlight')

  const task = new TrackETA(serverList.length + 1, 'Page revalidation')

  tabBroadcast(`revalidating /boss-tracker...`, 'neutral')
  await revalidateServer()
  task.incTask()

  for (const { serverName } of serverList) {
    tabBroadcast(`revalidating ${serverName}...`, 'neutral')
    await revalidateServer(serverName)
    task.incTask()
  }
  task.finish()
}
