export const resolvers = {
  mount: (name: string): string => `/sprites/mounts/${name}.gif`,
}

export const rareSet = {
  mount: new Set(['Neon Sparkid']),
}
