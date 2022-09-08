import { broadcast } from 'logging'
import { Static, History } from 'Data'

const main = async (): Promise<void> => {
  const staticData = new Static()
  const history = new History()

  await staticData.load()
  await history.load()

  const allAuctions = history.getEntireHistory()

  broadcast('Checking static files...', 'neutral')
  allAuctions.forEach((auction) => staticData.checkAuction(auction))

  const missingFiles = [...staticData.getMissingFiles()]
  broadcast(`Task finished! ${missingFiles.length} missing files`, 'success')
  console.log(staticData.getMissingFileAuctions())
}

export default main
