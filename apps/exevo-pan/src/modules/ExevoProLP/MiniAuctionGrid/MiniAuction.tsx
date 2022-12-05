import { memo } from 'react'
import clsx from 'clsx'
import { ExevoPanIcon } from 'assets/svgs'

export type Variant = 'light' | 'dark'

type MiniAuctionProps = {
  variant: Variant
} & JSX.IntrinsicElements['div']

const shadow = {
  light: '44 48 56',
  dark: '4 8 16',
}

const getShadow = (light: Variant) => {
  const shadowColor = light === 'light' ? shadow.light : shadow.dark

  return `-70px 70px 65px rgb(${shadowColor} / 7%), -30px 30px 30px rgb(${shadowColor} / 6%), -15px 15px 15px rgb(${shadowColor} / 5%), -10px 10px 8px rgb(${shadowColor} / 4%), -4px 4px 4px rgb(${shadowColor} / 3%), -2px 2px 2px rgb(${shadowColor} / 2%)`
}

const MiniAuction = ({ variant, className, ...props }: MiniAuctionProps) => (
  <div
    className={clsx(
      className,
      'child:rounded-xl child:w-full child:h-full child:bg-surface relative h-40 w-40',
    )}
    {...props}
  >
    <div
      className="z-2 absolute grid place-content-center"
      style={{
        boxShadow: getShadow(variant),
      }}
    >
      <ExevoPanIcon style={{ height: 60, width: 60 }} />
    </div>
    <div
      className="z-1 absolute"
      style={{
        boxShadow: getShadow(variant),
        transform: 'matrix(1, 0, 0, 1, -4, 4)',
      }}
    />
  </div>
)

export default memo(MiniAuction)
