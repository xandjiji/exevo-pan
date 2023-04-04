import clsx from 'clsx'
import type { CSSProperties } from 'react'
import styles from './styles.module.css'

type ShinyProps = JSX.IntrinsicElements['div'] &
  Required<Pick<CSSProperties, 'width' | 'animationIterationCount'>>

const Shine = ({
  animationIterationCount,
  width,
  className,
  style,
  ...props
}: ShinyProps) => (
  <div
    role="none"
    className="absolute top-0 left-0 h-full w-full overflow-hidden"
  >
    <div
      className={clsx(
        className,
        styles.animation,
        'via-primaryHighlight/20 absolute top-0 h-[calc(100%+32px)] bg-gradient-to-r from-transparent to-transparent',
      )}
      style={{ rotate: '32deg', ...style, width, animationIterationCount }}
      {...props}
    />
  </div>
)

export default Shine
