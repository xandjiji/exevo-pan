import { broadcast, coloredText } from 'logging'
import { updateInactiveServers, insertNewServers } from './tasks'
import { db, fetchServerPage } from './utils'

const main = async (): Promise<void> => {
  broadcast('Synching Tibia servers data...', 'neutral')
  const [storedServers, freshServers] = await Promise.all([
    db.getAllServers(),
    fetchServerPage(),
  ])

  const inactiveServers = await updateInactiveServers({
    storedServers,
    freshServers,
  })

  if (inactiveServers) {
    broadcast(
      `Inactive servers (${coloredText(
        inactiveServers,
        'success',
      )}) were updated...`,
      'highlight',
    )
  }

  const newServers = await insertNewServers({
    storedServers,
    freshServers,
  })

  if (newServers) {
    broadcast(
      `New servers (${coloredText(newServers, 'success')}) were added...`,
      'highlight',
    )
  }
}

export default main
