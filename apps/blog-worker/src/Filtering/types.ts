export type PostTest = (post: BlogPost) => boolean

export type FilterPostOptions = {
  posts: BlogPost[]
  filters: BlogFilterOptions
}
