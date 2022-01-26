export type CacheObject = Record<string, BlogFilterResponse>

export type GetStaticContentProps = {
  locale?: string
  slug: string
}

export type AllBlogPosts = Record<RegisteredLocale, BlogPost[]>
