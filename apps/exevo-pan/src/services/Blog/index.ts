/* eslint-disable no-console */
import { endpoints } from 'Constants'
import { serializeBody } from 'shared-utils/dist/contracts/BlogFilters/utils'
import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_OPTIONS,
} from 'shared-utils/dist/contracts/BlogFilters/defaults'
import { CacheObject } from './types'

const CACHE_MAX_AGE = 180000

export default class BlogClient {
  static cache: CacheObject = {}

  static blogQueryUrl = `${endpoints.BLOG_QUERY}`

  static blogStaticUrl = `${endpoints.BLOG_STATIC}`

  static getCache(key: string): BlogFilterResponse | undefined {
    const cacheKey = key
    return this.cache[cacheKey]
  }

  static setCache(key: string, data: BlogFilterResponse): void {
    const cacheKey = key
    this.cache[cacheKey] = data
    setTimeout(() => delete this.cache[cacheKey], CACHE_MAX_AGE)
  }

  static async queryBlog({
    paginationOptions = DEFAULT_PAGINATION_OPTIONS,
    sortOptions = DEFAULT_SORT_OPTIONS,
    filterOptions = DEFAULT_FILTER_OPTIONS,
  }: Partial<BlogFilterBodyPayload>): Promise<BlogFilterResponse> {
    const bodyPayload = serializeBody({
      paginationOptions,
      sortOptions,
      filterOptions,
    })

    const cachedResult = this.getCache(bodyPayload)
    if (cachedResult) return cachedResult

    const response = await fetch(this.blogQueryUrl, {
      method: 'POST',
      body: bodyPayload,
    })

    const data: BlogFilterResponse = await response.json()
    this.setCache(bodyPayload, data)

    return data
  }
}
