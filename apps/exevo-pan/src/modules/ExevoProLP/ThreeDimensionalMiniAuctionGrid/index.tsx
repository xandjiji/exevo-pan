import { memo } from 'react'
import clsx from 'clsx'
import { useTheme } from 'contexts/useTheme'
import MiniAuction, { Variant } from './MiniAuction'

const Row = memo(({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div className={clsx(className, 'flex gap-4')} {...props} />
))

const ThreeDimensionalMiniAuctionGrid = ({
  className,
  style,
  ...props
}: JSX.IntrinsicElements['div']) => {
  const { theme } = useTheme()
  const variant: Variant = theme === 'light' ? 'light' : 'dark'

  return (
    <div
      className={clsx(className, 'flex flex-col gap-4 checked:shrink-0')}
      style={{
        transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)',
        ...style,
      }}
      {...props}
    >
      <Row>
        <MiniAuction variant={variant} className="z-3" />
        <MiniAuction variant={variant} className="z-2" />
        <MiniAuction variant={variant} className="z-1" />
      </Row>

      <Row>
        <MiniAuction variant={variant} className="z-3" />
        <MiniAuction variant={variant} className="z-2" />
      </Row>
    </div>
  )
}

export default memo(ThreeDimensionalMiniAuctionGrid)
