import { broadcast } from 'logging'
import { ExevoPanClient } from 'services'
import { retryWrapper } from 'utils'

const dispatchRevalidate = retryWrapper(ExevoPanClient.revalidate)

const main = async (): Promise<void> => {
  const [, , route] = process.argv
  broadcast(`Revalidating /${route ?? ''} ...`, 'neutral')
  await dispatchRevalidate(route)
  broadcast(`Pages revalidated!`, 'success')
}

export default main
