export type SpritePortraitProps = React.HTMLAttributes<HTMLDivElement> & {
  offset?: boolean
  src: string
  alt?: string
  width: number
  height: number
  onError?: () => void
}

export type BackgroundProps = {
  offset?: boolean
} & JSX.IntrinsicElements['div']
