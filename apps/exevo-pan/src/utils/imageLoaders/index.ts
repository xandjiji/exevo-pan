export const loadThumbnail = (src: string, size?: number) => {
  if (!size) return src

  const [path, extension] = src.split('.')
  return `${path}-${size}.${extension}`
}

const isDev =
  process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_FRONT_DEV

export const loadRawSrc = (src: string) =>
  `${
    isDev
      ? 'http://localhost:3000'
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL as string}`
  }${src}`

export const loadBossSrc = (bossName: string) =>
  `/sprites/bosses/${encodeURI(bossName)}.gif`

export const loadLootSrc = (bossName: string) =>
  `/sprites/loot/${encodeURI(bossName)}.gif`

export const loadOutfitSrc = (outfitId: string) =>
  `https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`
