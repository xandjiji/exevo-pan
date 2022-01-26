export type CacheObject = Record<string, BlogFilterResponse>

export type GetStaticContentProps = {
  locale?: string
  slug: string
}

export type GetEveryPostLocaleProps = {
  pageSize?: number
  excludedSlug?: string
  showHidden?: boolean
}

export type AllBlogPosts = Record<RegisteredLocale, BlogPost[]>
