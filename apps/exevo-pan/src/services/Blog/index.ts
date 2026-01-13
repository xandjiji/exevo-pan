/* eslint-disable no-console */
import { endpoints, locales } from 'Constants'
import { serializeBody } from 'shared-utils/dist/contracts/BlogFilters/utils'
import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/BlogFilters/defaults'
import {
  AllBlogPosts,
  CacheObject,
  GetEveryPostLocaleProps,
  GetStaticContentProps,
} from './types'

const { DEFAULT_LOCALE } = locales
const CACHE_MAX_AGE = 180000
const MDX_EXTENSION = '.mdx'
const POST_DATA_FILE = 'PostData.json'
const DEV_POSTS_PATH = '/home/xand/exevo-pan/apps/blog-worker/_posts'

export default class BlogClient {
  private static cache: CacheObject = {}

  private static blogQueryUrl = `${endpoints.BLOG_QUERY}`

  private static blogStaticUrl = `${endpoints.BLOG_STATIC}`

  private static getCache(
    key: string,
    locale: string,
  ): BlogFilterResponse | undefined {
    const cacheKey = `${locale}${key}`
    return this.cache[cacheKey]
  }

  private static setCache(
    key: string,
    locale: string,
    data: BlogFilterResponse,
  ): void {
    const cacheKey = `${locale}${key}`
    this.cache[cacheKey] = data
    setTimeout(() => delete this.cache[cacheKey], CACHE_MAX_AGE)
  }

  static async queryBlog(
    {
      paginationOptions = DEFAULT_PAGINATION_OPTIONS,
      sortOptions = DEFAULT_SORT_OPTIONS,
      filterOptions = DEFAULT_FILTER_OPTIONS,
    }: Partial<BlogFilterBodyPayload>,
    locale = DEFAULT_LOCALE as string,
    showHidden = false,
  ): Promise<BlogFilterResponse> {
    const bodyPayload = serializeBody({
      paginationOptions,
      sortOptions,
      filterOptions,
    })

    const cachedResult = this.getCache(bodyPayload, locale)
    if (cachedResult) return cachedResult

    const response = await fetch(
      `${this.blogQueryUrl}/${locale}${showHidden ? '?hidden=true' : ''}`,
      {
        method: 'POST',
        body: bodyPayload,
      },
    )

    const data: BlogFilterResponse = await response.json()
    this.setCache(bodyPayload, locale, data)

    return data
  }

  static async getStaticPost({
    locale = DEFAULT_LOCALE as string,
    slug,
  }: GetStaticContentProps): Promise<string> {
    if (
      process.env.NODE_ENV === 'development' &&
      typeof window === 'undefined'
    ) {
      try {
        const { promises: fs } = await import('fs')
        const { join } = await import('path')
        const filePath = join(DEV_POSTS_PATH, locale, `${slug}${MDX_EXTENSION}`)
        return await fs.readFile(filePath, 'utf-8')
      } catch (error) {
        console.warn(
          `Failed to read post from filesystem: ${slug} (${locale}). Falling back to fetch.`,
          error,
        )
      }
    }

    const response = await fetch(
      `${this.blogStaticUrl}/${locale}/${slug}${MDX_EXTENSION}`,
    )
    return response.text()
  }

  static async getEveryPostLocale({
    pageSize,
    excludedSlug,
    showHidden = false,
  }: GetEveryPostLocaleProps): Promise<AllBlogPosts> {
    const response = await fetch(`${this.blogStaticUrl}/${POST_DATA_FILE}`)

    const data: Record<string, BlogPost[]> = await response.json()
    const paginatedData = {} as AllBlogPosts

    Object.keys(data).forEach((localeRoute) => {
      const localeKey = localeRoute.replace('/', '') as RegisteredLocale
      paginatedData[localeKey] = data[localeRoute]
        .filter(({ hidden }) => showHidden || !hidden)
        .filter(({ slug }) => slug !== excludedSlug)
        .slice(0, pageSize)
    })

    return paginatedData
  }

  static async getPostBySlug(
    slug: string,
    locale = DEFAULT_LOCALE as string,
  ): Promise<BlogPost | undefined> {
    const allPosts = await this.getEveryPostLocale({})

    return allPosts[locale as RegisteredLocale].find(
      (post) => post.slug === slug,
    )
  }
}
