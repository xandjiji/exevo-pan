export type ScrapingTokens = Record<string, string>

type Id = {
  male: number
  female: number
}

export type OutfitToken = {
  name: string
  id: Id
}

export type MountToken = {
  name: string
  id: number
}
