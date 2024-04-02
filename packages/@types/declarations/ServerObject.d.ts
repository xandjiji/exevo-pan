declare type ServerLocation =
  | { string: 'OCE'; type: 3 }
  | { string: 'BR'; type: 2 }
  | { string: 'EU'; type: 0 }
  | { string: 'NA'; type: 1 }

declare type PvpType =
  | { string: 'Hardcore'; type: 3 }
  | { string: 'Open'; type: 1 }
  | { string: 'Optional'; type: 0 }
  | { string: 'Retro Hardcore'; type: 4 }
  | { string: 'Retro Open'; type: 2 }

declare interface ServerObject {
  battleye: boolean
  experimental: boolean
  serverId: number
  serverName: string
  serverLocation: ServerLocation
  pvpType: PvpType
}

declare type PartialServerObject = Omit<ServerObject, 'serverId'>
