export const tagById: Record<string, BlogTag> = {
  news: {
    id: 'news',
    color: 210,
  },
  article: {
    id: 'article',
    color: 40,
  },
  tutorial: {
    id: 'tutorial',
    color: 140,
  },
}

export const all: BlogTag[] = Object.values(tagById)

export const blogTags = {
  all,
  tagById,
}
