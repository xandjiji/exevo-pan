import { StaticImageData } from 'next/image'

export type SpritePortraitProps = React.HTMLAttributes<HTMLDivElement> & {
  offset?: boolean
  highlight?: boolean
  counter?: React.ReactNode
  src: string | StaticImageData
  alt: string
  width: number
  height: number
  onError?: () => void
  imgStyle?: JSX.IntrinsicElements['img']['style']
}

export type BackgroundProps = Pick<
  SpritePortraitProps,
  'offset' | 'highlight'
> &
  JSX.IntrinsicElements['div']
