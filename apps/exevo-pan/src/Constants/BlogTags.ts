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
    color: 110,
  },
  tips: {
    id: 'tips',
    color: 300,
  },
}

export const all: BlogTag[] = Object.values(tagById)

export const blogTags = {
  all,
  tagById,
}
