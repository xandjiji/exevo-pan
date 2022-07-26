import { HTMLAttributes } from 'react'

export interface SkillBarProps extends HTMLAttributes<HTMLDivElement> {
  skillName: string
  skillValue: number
  highlight?: boolean
}
