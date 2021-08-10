export type Animations = 'pulsate' | 'wave'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: Animations
}

export interface SkeletonStyleProps {
  animation?: Animations
}
