import { endpoints } from 'Constants'

export const loadThumbnail = (src: string, size?: number) => {
  if (!size) return src

  const [path, extension] = src.split('.')
  return `${path}-${size}.${extension}`
}

const isDev =
  process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_FRONT_DEV

export const loadRawSrc = (src: string) =>
  `${isDev ? 'http://localhost:3000' : `${endpoints.ASSETS}`}${src}`

export const loadBossSrc = (bossName: string) =>
  `${endpoints.ASSETS}/sprites/bosses/${encodeURI(bossName)}.gif`

export const loadDisplayNameBossSrc = (displayName: string) => {
  const [bossName] = displayName.split(' (')
  return loadBossSrc(bossName)
}

export const loadLootSrc = (bossName: string) =>
  `${endpoints.ASSETS}/sprites/loot/${encodeURI(bossName)}.gif`

export const loadOutfitSrc = (outfitId: string) =>
  `https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`

export const loadSprite = (src: string) => `${endpoints.ASSETS}/sprites/${src}`

export const loadCalculatorHero = (src: string) =>
  `${endpoints.ASSETS}/calculators/${src}`
