/* eslint-disable no-restricted-syntax */
import fs from 'fs'
import promisedFs from 'fs/promises'
import readline from 'readline'
import { TrackETA } from 'logging'

const TASK_UPDATE_INTERVAL = 1000

export const readJsonl = async <T>(path: string): Promise<T[]> => {
  const fileStat = await promisedFs.stat(path)

  const fileStream = fs.createReadStream(path, { encoding: 'utf8' })
  const rl = readline.createInterface({ input: fileStream })

  const bytes = fileStat.size
  const eta = new TrackETA(bytes > 0 ? bytes : 1)

  const updater = setInterval(
    () => eta.setCurrentTask(fileStream.bytesRead),
    TASK_UPDATE_INTERVAL,
  )

  const array: T[] = []
  for await (const line of rl) {
    const object = JSON.parse(line)
    array.push(object)
  }

  clearInterval(updater)

  const { bytesRead } = fileStream
  eta.setCurrentTask(bytesRead > 0 ? bytesRead : 1)
  eta.finish()

  return array
}

export const writeJsonl = async <T>(
  path: string,
  objects: T[],
): Promise<void> => {
  const objectCount = objects.length
  const eta = new TrackETA(objectCount > 0 ? objectCount : 1)
  const fileStream = fs.createWriteStream(path, { flags: 'w' })

  return new Promise((resolve, reject) => {
    let task = 0
    const PERCENT = Math.round(objects.length / 100)
    for (const object of objects) {
      fileStream.write(`${JSON.stringify(object)}\n`)
      task += 1
      if (task % PERCENT === 0) {
        eta.setCurrentTask(task)
      }
    }
    fileStream.end()
    fileStream.on('finish', () => {
      eta.setCurrentTask(task > 0 ? task : 1)
      eta.finish()
      resolve()
    })
    fileStream.on('error', reject)
  })
}
