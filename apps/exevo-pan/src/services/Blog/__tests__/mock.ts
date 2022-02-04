import { generateBlogPosts } from 'utils/test'

export const blogPosts = generateBlogPosts()

export const staticPostData = {
  '/en': blogPosts,
  '/es': blogPosts,
  '/pl': blogPosts,
  '/pt': blogPosts,
}

export const staticPostDataResponse = {
  en: blogPosts,
  es: blogPosts,
  pl: blogPosts,
  pt: blogPosts,
}
