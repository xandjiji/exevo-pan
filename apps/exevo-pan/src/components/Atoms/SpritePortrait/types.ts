export type SpritePortraitProps = React.HTMLAttributes<HTMLDivElement> & {
  offset?: boolean
  highlight?: boolean
  src: string | StaticImageData
  alt?: string
  width: number
  height: number
  onError?: () => void
}

export type BackgroundProps = Pick<
  SpritePortraitProps,
  'offset' | 'highlight'
> &
  JSX.IntrinsicElements['div']
