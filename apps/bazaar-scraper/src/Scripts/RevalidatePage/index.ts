import { broadcast } from 'logging'
import { RevalidateClient } from 'services'
import { retryWrapper } from 'utils'

const dispatchRevalidate = retryWrapper(RevalidateClient.route)

const main = async (): Promise<void> => {
  const [, , route] = process.argv
  broadcast(`Revalidating /${route ?? ''} ...`, 'neutral')
  await dispatchRevalidate(route)
  broadcast(`Pages revalidated!`, 'success')
}

export default main
