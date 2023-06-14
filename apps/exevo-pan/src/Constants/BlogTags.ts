import { generateTagColors } from 'utils/generateTagColor'
import common from 'locales/en/common'

export const tagById: Record<keyof typeof common.BlogTags, BlogTag> = {
  news: {
    id: 'news',
    color: 210,
    ...generateTagColors(210),
  },
  article: {
    id: 'article',
    color: 40,
    ...generateTagColors(40),
  },
  tutorial: {
    id: 'tutorial',
    color: 110,
    ...generateTagColors(110),
  },
  tips: {
    id: 'tips',
    color: 300,
    ...generateTagColors(300),
  },
}

const all: BlogTag[] = Object.values(tagById)

const fallbackColor = generateTagColors(0)

export const blogTags = {
  all,
  tagById,
  fallbackColor,
}
