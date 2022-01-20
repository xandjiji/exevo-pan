declare type BlogPostAuthor = {
  name: string
  outfit: string
}

declare type BlogPost = {
  title: string
  slug: string
  description: string
  thumbnail: string
  date: number
  tags: string[]
  author: BlogPostAuthor
  translator?: BlogPostAuthor
}
