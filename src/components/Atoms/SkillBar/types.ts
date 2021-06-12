import { HTMLAttributes } from 'react'

export interface SkillBarProps {
  skillName: string
  skillValue: number
  highlight?: boolean
  props?: HTMLAttributes<HTMLDivElement>
}

export interface WrapperProps {
  highlight: boolean
}

export interface InfoProps {
  skillName?: string
}
