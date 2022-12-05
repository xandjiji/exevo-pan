import { memo } from 'react'
import clsx from 'clsx'
import { useTheme } from 'contexts/useTheme'
import MiniAuction, { Variant } from './MiniAuction'

const Row = memo(({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div className={clsx(className, 'grid w-fit grid-cols-3 gap-4')} {...props} />
))

const MiniAuctionGrid = () => {
  const { theme } = useTheme()
  const variant: Variant = theme === 'light' ? 'light' : 'dark'

  return (
    <div
      className="grid w-fit gap-4"
      style={{ transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)' }}
    >
      <Row>
        <MiniAuction variant={variant} className="z-3" />
        <MiniAuction variant={variant} className="z-2" />
        <MiniAuction variant={variant} className="z-1" />
      </Row>

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

export default memo(MiniAuctionGrid)
