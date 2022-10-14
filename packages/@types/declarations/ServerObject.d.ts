declare type ServerLocations = 'EU' | 'NA' | 'BR'

declare type PvpTypes =
  | 'Optional'
  | 'Open'
  | 'Retro Open'
  | 'Hardcore'
  | 'Retro Hardcore'

declare interface ServerObject {
  serverName: string
  active: boolean
  battleye: boolean
  experimental: boolean
  serverLocation: string
  pvpType: string
}
