import { HTMLAttributes } from 'react'

export interface SkillBarProps extends HTMLAttributes<HTMLDivElement> {
  skillName: string
  skillValue: number
  highlight?: boolean
}

export interface WrapperProps {
  highlight: boolean
}

export interface ProgressBarProps {
  skillName?: string
}
