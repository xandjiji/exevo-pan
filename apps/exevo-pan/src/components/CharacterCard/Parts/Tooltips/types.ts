import { Placement } from '@popperjs/core'

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[]
  placement?: Placement
}

export interface CharacterCharmsProps extends TooltipProps {
  charmInfo?: CharmInfo
}

export interface CharacterAchievementsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  achievementPoints: number
}

export interface CharacterHirelingsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hirelingsInfo: HirelingsInfo
}

export interface ListedItemsProps {
  fullList: string[]
  characterSet: Set<string>
}

export type IconProps = {
  icon: React.ReactElement
} & JSX.IntrinsicElements['svg']
