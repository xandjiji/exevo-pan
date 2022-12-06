import { memo } from 'react'
import { ExevoPanIcon } from 'assets/svgs'

const MiniAuction = () => (
  <div className="bg-surface flex h-56 w-40 flex-col gap-3 rounded-xl p-4 shadow-md">
    <div className="flex gap-2 opacity-30">
      <div className="bg-primaryVariant grid h-9 w-9 place-items-center rounded-xl">
        <ExevoPanIcon style={{ height: 18, width: 18 }} />
      </div>

      <div className="flex flex-col justify-center gap-2 opacity-30">
        <div className="bg-primaryHighlight h-1 w-10 rounded-md" />
        <div className="bg-onSurface/50 h-1 w-16 rounded-md" />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2 opacity-30">
      <div className="border-1 border-separator h-3 rounded border-solid" />
      <div className="border-1 border-separator h-3 rounded border-solid" />
    </div>

    <div className="flex justify-center gap-2 opacity-30">
      <div className="bg-primaryVariant h-6 w-6 rounded-md" />
      <div className="bg-primaryVariant h-6 w-6 rounded-md" />
      <div className="bg-primaryVariant h-6 w-6 rounded-md" />
      <div className="bg-primaryVariant h-6 w-6 rounded-md" />
    </div>

    <div className="grid grid-cols-2 gap-2 opacity-30">
      {[1, 2, 3, 4].map((key) => (
        <div key={key} className="flex items-center gap-1">
          <div className="bg-primary h-3 w-4 shrink-0 rounded" />
          <div className="bg-primary/60 mt-1 h-1 w-full rounded-md" />
        </div>
      ))}
    </div>

    <div className="child:h-1 child:rounded grid grid-cols-2 gap-2">
      <div className="bg-onSurface/50 w-12 opacity-30" />
      <div className="bg-onSurface/50  w-14 opacity-30" />
      <div className="bg-onSurface/50 w-10 opacity-30" />
      <div className="bg-rare h-1 w-10" />
    </div>

    <div className="flex gap-2 opacity-30">
      <div className="bg-primaryVariant h-3 w-7 rounded-md" />
      <div className="bg-primaryVariant h-3 w-7 rounded-md" />
    </div>
  </div>
)

export default memo(MiniAuction)
