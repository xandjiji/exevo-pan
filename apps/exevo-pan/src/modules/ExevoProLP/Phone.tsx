import { memo } from 'react'
import { RareFrame } from 'components/Atoms'
import { padTime } from 'utils'

const Phone = () => (
  <div
    className="border-separator bg-surface child:mx-auto h-[84px] w-12 rounded-md border-solid p-2 shadow-lg"
    style={{ borderWidth: 3 }}
  >
    <div className="text-separator text-center text-xs">
      {padTime(new Date().getHours())}
      <span className="animate-blinking text-tsm">:</span>
      {padTime(new Date().getMinutes())}
    </div>
    <div className="bg-separator/30 mt-0.5 h-1 w-5 rounded-sm" />

    <div
      className="child:w-8 child:rounded-sm mt-3 grid place-content-center"
      style={{ gap: 3 }}
    >
      <div className="relative flex h-2.5 items-center justify-between py-1 px-1.5">
        <RareFrame />

        <div className="bg-rare h-1 w-1 rounded-sm" />
        <div className="bg-rare h-0.5 w-3 rounded-sm" />
      </div>

      <div className="bg-separator/30 h-2" />
    </div>
  </div>
)

export default memo(Phone)
