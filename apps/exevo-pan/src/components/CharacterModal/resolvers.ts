import { endpoints } from 'Constants'

export const resolvers = {
  outfit: (name: string, sex: boolean, type: number): string =>
    `${endpoints.ASSETS}/sprites/outfits/${
      sex ? 'female' : 'male'
    }/${name}_${type}.gif`,
  mount: (name: string): string =>
    `${endpoints.ASSETS}/sprites/mounts/${name}.gif`,
  storeOutfit: (name: string, sex: boolean, type: number): string =>
    `${endpoints.ASSETS}/sprites/storeoutfits/${
      sex ? 'female' : 'male'
    }/${name}_${type}.gif`,
  storeMount: (name: string): string =>
    `${endpoints.ASSETS}/sprites/storemounts/${name}.gif`,
  storeItem: (name: string): string =>
    `${endpoints.ASSETS}/sprites/store/${name}.gif`,
}
