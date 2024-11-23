import { Placement } from '@popperjs/core'

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[]
  placement?: Placement
}

export interface CharacterCharmsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  charmPoints?: number
}

export interface CharacterAchievementsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  achievementPoints: number
}

export interface BossPointsProps extends React.HTMLAttributes<HTMLDivElement> {
  bossPoints: number
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
  icon: JSX.Element & React.ReactElement<React.SVGAttributes<SVGElement>>
} & JSX.IntrinsicElements['svg']
