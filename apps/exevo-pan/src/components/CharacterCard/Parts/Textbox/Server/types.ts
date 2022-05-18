import { Placement } from '@popperjs/core'

export interface ServerInfoProps {
  serverData: ServerObject
  transfer: boolean
  nickname: string
  placement?: Placement
}

export interface TransferIconProps {
  transfer: boolean
  nickname: string
  placement?: Placement
}
