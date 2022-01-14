const news = {
  id: 'news',
  name: 'News',
  color: 210,
}

const article = {
  id: 'article',
  name: 'Article',
  color: 40,
}

export const all: BlogTag[] = [news, article]

export const tagById: Record<string, BlogTag> = {
  news,
  article,
}

export const blogTags = {
  all,
  tagById,
}
