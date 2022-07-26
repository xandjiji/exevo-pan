export type SkillBarProps = {
  skillName: string
  skillValue: number
  highlight?: boolean
  expandable?: boolean
} & JSX.IntrinsicElements['button']
