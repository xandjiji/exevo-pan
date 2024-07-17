import fs from 'fs/promises'
import zlib from 'zlib'
import { file } from 'Constants'
import * as fallbacks from './fallbacks'
import { PostHtmlProps } from './types'

export default class RawClient {
  private static QUERY_PARAMS = {
    auctionId: 'auctionid',
  }

  static async getHtml(url: string): Promise<string> {
    const auctionId = new URLSearchParams(url).get(this.QUERY_PARAMS.auctionId)
    if (!auctionId) throw Error(`Can't find raw data for '${url}'`)

    try {
      const gzippedData = await fs.readFile(
        file.RAW_DATA_FOLDER.auctionResolver(+auctionId, 'html'),
      )

      const unzippedBuffer = zlib.gunzipSync(gzippedData)
      return unzippedBuffer.toString()
    } catch {
      return fallbacks.internalError
    }
  }

  static async tryGetHtml(url: string): Promise<string | false> {
    const auctionId = new URLSearchParams(url).get(this.QUERY_PARAMS.auctionId)
    if (!auctionId) throw Error(`Can't find raw data for '${url}'`)

    try {
      const gzippedData = await fs.readFile(
        file.RAW_DATA_FOLDER.auctionResolver(+auctionId, 'html'),
      )

      const unzippedBuffer = zlib.gunzipSync(gzippedData)
      return unzippedBuffer.toString()
    } catch {
      return false
    }
  }

  static async postHtml({
    auctionId,
    pageIndex,
    type,
  }: PostHtmlProps): Promise<string> {
    const resolvedFileName = `${type}-${pageIndex}`
    file.RAW_DATA_FOLDER.auctionResolver(auctionId, resolvedFileName)

    const gzippedData = await fs.readFile(
      file.RAW_DATA_FOLDER.auctionResolver(auctionId, resolvedFileName),
    )

    const unzippedBuffer = zlib.gunzipSync(gzippedData)
    return unzippedBuffer.toString()
  }
}
