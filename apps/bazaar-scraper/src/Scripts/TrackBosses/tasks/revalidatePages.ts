/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { broadcast, tabBroadcast, TrackETA } from 'logging'
import { RevalidateClient } from 'services'

const ROUTE_PATH = 'boss-tracker'

export const revalidatePages = async (
  serverList: ServerObject[],
): Promise<void> => {
  broadcast('Revalidating pages', 'highlight')

  const task = new TrackETA(serverList.length, 'Page revalidation')
  for (const { serverName } of serverList) {
    tabBroadcast(`revalidating ${serverName}...`, 'neutral')
    await RevalidateClient.route(`${ROUTE_PATH}/${serverName}`)
    task.incTask()
  }
  task.finish()
}
