import { memo } from 'react'
import { RareFrame } from 'components/Atoms'

const Notebook = () => (
  <div className="bg-separator/60 relative h-[70px] w-24 rounded-md px-1 pt-1.5 pb-2.5 shadow-sm">
    <div className="bg-surface flex h-full w-full flex-col content-between justify-between p-1">
      <div className="relative ml-auto flex items-center justify-between gap-1 rounded py-1 px-1.5">
        <RareFrame />

        <div className="grid gap-0.5">
          <div className="bg-rare h-0.5 w-5 rounded-sm" />
          <div className="bg-rare h-0.5 w-3 rounded-sm" />
        </div>
        <div className="text-rare text-xs font-bold">!</div>
      </div>

      <div className="flex justify-center gap-1">
        <div className="bg-separator/30 h-2 w-2 rounded-sm" />
        <div className="bg-separator/30 h-2 w-2 rounded-sm" />
        <div className="bg-separator/30 h-2 w-2 rounded-sm" />
        <div className="bg-separator/30 h-2 w-2 rounded-sm" />
        <div className="bg-separator/30 h-2 w-2 rounded-sm" />
        <div className="bg-separator/30 h-2 w-2 rounded-sm" />
      </div>
    </div>

    <div
      className="bg-separator absolute left-1/2 bottom-0 h-1.5 w-32 rounded-t-sm rounded-b-full shadow-md"
      style={{ transform: 'translateX(-50%)' }}
    />
  </div>
)

export default memo(Notebook)
