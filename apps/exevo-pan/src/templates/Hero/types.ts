export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  src: string
  offset?: boolean
  hueRotation?: number
  dimension?: number
}
