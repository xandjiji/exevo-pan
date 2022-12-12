import { memo } from 'react'
import clsx from 'clsx'
import { ExevoPanIcon } from 'assets/svgs'
import { RareFrame } from 'components/Atoms'

const MiniAuction = ({ highlight = false }) => (
  <div className="bg-surface relative flex h-16 w-12 flex-col gap-2 rounded p-1.5 shadow-md">
    {highlight && <RareFrame />}
    <div className="flex gap-1 opacity-30">
      <div className="bg-separator grid h-3 w-3 place-items-center rounded">
        {highlight && <ExevoPanIcon style={{ width: 6, height: 6 }} />}
      </div>

      <div className="flex flex-col justify-center gap-0.5">
        <div className="bg-separator h-0.5 w-3 rounded-md" />
        <div className="bg-separator h-0.5 w-4 rounded-md" />
      </div>
    </div>

    <div className="child:h-1 child:rounded-sm child:opacity-30 flex flex-wrap gap-0.5">
      <div className="bg-separator w-4" />
      <div className="bg-separator w-4" />

      <div className="bg-separator w-5" />
      <div className="bg-separator w-3" />

      <div className="bg-separator w-4" />
      <div className="bg-separator w-4" />

      <div className="bg-separator w-3" />
      <div
        className={clsx(
          'w-5',
          highlight ? 'bg-rare !opacity-100' : 'bg-separator',
        )}
      />

      <div className="bg-separator w-5" />
      <div className="bg-separator w-3" />
    </div>
  </div>
)

export default memo(MiniAuction)
