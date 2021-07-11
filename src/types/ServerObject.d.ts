declare type ServerLocation =
  | { name: 'BR'; type: 2 }
  | { name: 'EU'; type: 0 }
  | { name: 'NA'; type: 1 }

declare type PvpType =
  | { name: 'Hardcore'; type: 3 }
  | { name: 'Open'; type: 1 }
  | { name: 'Optional'; type: 0 }
  | { name: 'Retro Hardcore'; type: 4 }
  | { name: 'Retro Open'; type: 2 }

declare interface ServerObject {
  battleye: boolean
  experimental: boolean
  serverId: number
  serverName: string
  serverLocation: ServerLocation
  pvpType: PvpType
}
