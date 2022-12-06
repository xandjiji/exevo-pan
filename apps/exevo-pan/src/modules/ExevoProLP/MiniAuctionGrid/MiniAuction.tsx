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
      'child:rounded-xl child:w-full child:h-full child:bg-surface relative h-56 w-40',
    )}
    {...props}
  >
    <div
      className="z-2 absolute flex flex-col gap-3 p-4"
      style={{
        boxShadow: getShadow(variant),
      }}
    >
      <div className="flex gap-2">
        <div className="bg-primaryVariant grid h-9 w-9 place-items-center rounded-xl">
          <ExevoPanIcon style={{ height: 18, width: 18 }} />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <div className="bg-primaryHighlight h-1 w-10 rounded-md" />
          <div className="bg-onSurface/50 h-1 w-16 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="border-1 border-separator h-3 rounded border-solid" />
        <div className="border-1 border-separator h-3 rounded border-solid" />
      </div>

      <div className="flex justify-center gap-2">
        <div className="bg-primaryVariant h-6 w-6 rounded-md" />
        <div className="bg-primaryVariant h-6 w-6 rounded-md" />
        <div className="bg-primaryVariant h-6 w-6 rounded-md" />
        <div className="bg-primaryVariant h-6 w-6 rounded-md" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((key) => (
          <div key={key} className="flex items-center gap-1">
            <div className="bg-primary h-3 w-4 shrink-0 rounded" />
            <div className="bg-primary/60 mt-1 h-1 w-full rounded-md" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-onSurface/50 h-0.5 w-12" />
        <div className="bg-onSurface/50 h-0.5 w-14" />
        <div className="bg-onSurface/50 h-0.5 w-10" />
        <div className="bg-onSurface/50 h-0.5 w-10" />
      </div>

      <div className="flex gap-2">
        <div className="bg-primaryVariant h-3 w-7 rounded-md" />
        <div className="bg-primaryVariant h-3 w-7 rounded-md" />
      </div>
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
