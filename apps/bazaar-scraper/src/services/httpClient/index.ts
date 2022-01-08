import fetch, { Headers } from 'node-fetch'
import UserAgent from 'user-agents'
import FormData from 'form-data'
import { PostHtmlProps, requestTypeKeys } from './types'

const REQUEST_TIMEOUT = 15000

export default class HttpClient {
  private static POST_ENDPOINT =
    'https://www.tibia.com/websiteservices/handle_charactertrades.php'

  static async getHtml(url: string): Promise<string> {
    const userAgent = new UserAgent()
    const response = await fetch(url, {
      timeout: REQUEST_TIMEOUT,
      headers: {
        'User-Agent': userAgent.toString(),
      },
    })

    if (response.status !== 200) {
      throw new Error(
        `getHtml() recieved a bad status code [${response.status}]`,
      )
    }

    return response.text()
  }

  static async getJSON<T>(url: string): Promise<T> {
    const response = await fetch(url, { timeout: REQUEST_TIMEOUT })

    if (response.status !== 200) {
      throw new Error(
        `getJSON() recieved a bad status code [${response.status}]`,
      )
    }

    return response.json()
  }

  static async postHtml({
    auctionId,
    pageIndex,
    type,
  }: PostHtmlProps): Promise<string> {
    const headers = new Headers()
    headers.set('X-Requested-With', 'XMLHttpRequest')
    headers.set('User-Agent', new UserAgent().toString())

    const body = new FormData()
    body.append('auctionid', auctionId)
    body.append('currentpage', pageIndex)
    body.append('type', requestTypeKeys[type])

    const response = await fetch(this.POST_ENDPOINT, {
      timeout: REQUEST_TIMEOUT,
      method: 'POST',
      headers,
      body,
    })

    if (response.status !== 200) {
      throw new Error(
        `postHtml() recieved a bad status code [${response.status}]`,
      )
    }

    const data = await response.json()
    const [ajaxObject] = data.AjaxObjects
    return ajaxObject.Data as string
  }
}
