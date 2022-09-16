import { links } from 'Constants'

export const loadThumbnail = (src: string, size?: number) => {
  if (!size) return src

  const [path, extension] = src.split('.')
  return `${path}-${size}.${extension}`
}

export const loadRawSrc = (src: string) => `${links.CANONICAL}${src}`

export const loadBossSrc = (bossName: string) =>
  `/sprites/bosses/${encodeURI(bossName)}.gif`
