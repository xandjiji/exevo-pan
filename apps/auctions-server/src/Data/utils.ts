import fs from 'fs/promises'
import { broadcast, coloredText } from 'logging'

const fileResolver = (fileName: string): string => `${__dirname}/${fileName}`

export const readLocalFile = async <T>(fileName: string): Promise<T> => {
  broadcast(`Loading ${coloredText(fileName, 'highlight')}...`, 'system')
  const fileData = await fs.readFile(fileResolver(fileName), 'utf-8')

  return JSON.parse(fileData)
}

const SERVER_FILE = 'ServerData.json'

const buildServerArray = (miniServerData: Record<string, ServerObject>) =>
  Object.values(miniServerData as Record<string, ServerObject>)

export const readServerData = async (): Promise<ServerObject[]> => {
  const serverData = await readLocalFile<Record<string, ServerObject>>(
    SERVER_FILE,
  )

  return buildServerArray(serverData)
}
