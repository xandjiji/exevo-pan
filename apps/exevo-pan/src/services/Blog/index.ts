/* eslint-disable no-console */
import { endpoints } from 'Constants'
import { serializeBody } from 'shared-utils/dist/contracts/BlogFilters/utils'
import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_OPTIONS,
} from 'shared-utils/dist/contracts/BlogFilters/defaults'
import { CacheObject, GetStaticContentProps } from './types'

const CACHE_MAX_AGE = 180000
const DEFAULT_LOCALE = 'en'
const MDX_EXTENSION = '.mdx'

export default class BlogClient {
  private static cache: CacheObject = {}

  private static blogQueryUrl = `${endpoints.BLOG_QUERY}`

  private static blogStaticUrl = `${endpoints.BLOG_STATIC}`

  private static getCache(key: string): BlogFilterResponse | undefined {
    const cacheKey = key
    return this.cache[cacheKey]
  }

  private static setCache(key: string, data: BlogFilterResponse): void {
    const cacheKey = key
    this.cache[cacheKey] = data
    setTimeout(() => delete this.cache[cacheKey], CACHE_MAX_AGE)
  }

  static async queryBlog(
    {
      paginationOptions = DEFAULT_PAGINATION_OPTIONS,
      sortOptions = DEFAULT_SORT_OPTIONS,
      filterOptions = DEFAULT_FILTER_OPTIONS,
    }: Partial<BlogFilterBodyPayload>,
    locale = DEFAULT_LOCALE,
    showHidden = false,
  ): Promise<BlogFilterResponse> {
    const bodyPayload = serializeBody({
      paginationOptions,
      sortOptions,
      filterOptions,
    })

    const cachedResult = this.getCache(bodyPayload)
    if (cachedResult) return cachedResult

    const response = await fetch(
      `${this.blogQueryUrl}/${locale}${showHidden ? '?hidden=true' : ''}`,
      {
        method: 'POST',
        body: bodyPayload,
      },
    )

    const data: BlogFilterResponse = await response.json()
    this.setCache(bodyPayload, data)

    return data
  }

  static async getStaticPost({
    locale = DEFAULT_LOCALE,
    slug,
  }: GetStaticContentProps): Promise<string> {
    try {
      const response = await fetch(
        `${this.blogStaticUrl}/${locale}/${slug}${MDX_EXTENSION}`,
      )
      return response.text()
    } catch {
      const response = await fetch(
        `${this.blogStaticUrl}/${DEFAULT_LOCALE}/${slug}${MDX_EXTENSION}`,
      )
      return response.text()
    }
  }
}
