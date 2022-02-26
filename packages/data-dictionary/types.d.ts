declare type ScrapingTokens = Record<string, string>

declare interface Nameable {
  name: string
}

declare interface Cosmetic extends Nameable {
  value: number
}

declare type Id = {
  male: number
  female: number
}

declare interface OutfitToken extends Cosmetic {
  id: Id
}

declare interface MountToken extends Cosmetic {
  id: number
}

declare type PriceMap = Record<string, number>
