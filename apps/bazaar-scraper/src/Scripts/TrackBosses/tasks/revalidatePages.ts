/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { broadcast, tabBroadcast, TrackETA } from 'logging'
import { RevalidateClient } from 'services'

const ROUTE_PATH = 'boss-tracker'

export const revalidatePages = async (serverList: string[]): Promise<void> => {
  broadcast('Revalidating pages', 'highlight')

  const task = new TrackETA(serverList.length, 'Page revalidation')
  for (const server of serverList) {
    tabBroadcast(`revalidating ${server}...`, 'neutral')
    await RevalidateClient.route(`${ROUTE_PATH}/${server}`)
    task.incTask()
  }
  task.finish()
}
