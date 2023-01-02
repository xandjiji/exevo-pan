export const resolvers = {
  outfit: (name: string, sex: boolean, type: number): string =>
    `/sprites/outfits/${sex ? 'female' : 'male'}/${name}_${type}.gif`,
  mount: (name: string): string => `/sprites/mounts/${name}.gif`,
  storeOutfit: (name: string, sex: boolean, type: number): string =>
    `/sprites/storeoutfits/${sex ? 'female' : 'male'}/${name}_${type}.gif`,
  storeMount: (name: string): string => `/sprites/storemounts/${name}.gif`,
  storeItem: (name: string): string => `/sprites/store/${name}.gif`,
}
