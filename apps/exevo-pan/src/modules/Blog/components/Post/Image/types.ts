import { ImageProps as NextImageProps } from 'next/image'

export type ImageProps = {
  caption?: React.ReactNode
  align?: 'left' | 'center' | 'right'
} & NextImageProps
