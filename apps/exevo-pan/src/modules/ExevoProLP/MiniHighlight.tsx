/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react'
import { RareFrame } from 'components/Atoms'
import MiniAuction from './MiniAuction'

const MiniHighlight = () => (
  <div className="grid gap-2">
    <div className="flex items-center justify-center gap-1 opacity-30">
      {Array.from({ length: 3 }).map((_, index) => (
        <Fragment key={index}>
          <div className="bg-separator h-2 w-2 rounded-full" />
          {index !== 2 && <div className="bg-separator h-0.5 w-3 rounded-sm" />}
        </Fragment>
      ))}
    </div>

    <div className="flex gap-2">
      <div className="grid gap-1">
        <div className="w-12">
          <div className="bg-surface overflow-hidden rounded shadow-md">
            <div className="bg-separator h-2 w-full opacity-30" />

            <div className="grid w-full grid-cols-3 place-items-center gap-0.5 p-1">
              {Array.from({ length: 9 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-separator h-1.5 w-2 rounded-sm opacity-30"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface relative grid gap-1 rounded p-1.5 shadow-md">
          <RareFrame />
          <div className="child:rounded-sm flex gap-0.5">
            <div className="bg-separator h-1 w-2 opacity-30" />
            <div className="bg-separator h-1 w-4 opacity-30" />
          </div>
          <div className="bg-rare h-1 w-5 rounded-sm" />
          <div className="bg-rare h-1 w-7 rounded-sm" />
        </div>

        <div className="bg-surface child:opacity-30 relative grid gap-1 rounded p-1.5 shadow-md">
          <div className="child:rounded-sm flex gap-0.5">
            <div className="bg-separator h-1 w-2" />
            <div className="bg-separator h-1 w-6" />
          </div>
          <div className="bg-separator h-1 w-6 rounded-sm" />
          <div className="bg-separator h-1 w-3 rounded-sm" />
          <div className="bg-separator h-1 w-5 rounded-sm" />
        </div>
      </div>

      <MiniAuction />
    </div>
  </div>
)

export default MiniHighlight
