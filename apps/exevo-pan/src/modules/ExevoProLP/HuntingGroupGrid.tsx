import clsx from 'clsx'
import { RareFrame } from 'components/Atoms'
import { LockIcon } from 'assets/svgs'
import { memo } from 'react'
import { loadRawSrc } from 'utils'

const groupSrc = loadRawSrc('/sprites/mini-hunting-group.png')

const HuntingGroupGrid = ({ isPrivate = false }) => (
  <div className="bg-surface relative flex items-center gap-2 rounded p-2 shadow-md">
    {isPrivate && <RareFrame />}
    <div className="bg-separator/30 grid h-6 w-6 place-items-center rounded">
      {isPrivate ? (
        <LockIcon className="fill-rare h-4 w-4" />
      ) : (
        <img
          src={groupSrc}
          width={16}
          height={13}
          alt="Hunting group"
          className="opacity-30"
        />
      )}
    </div>
    <div className="grid gap-1.5 pr-1">
      <div
        className={clsx(
          'h-1 w-9 rounded',
          isPrivate ? 'bg-rare' : 'bg-separator opacity-30',
        )}
      />
      <div className="bg-separator h-1 w-5 rounded opacity-30" />
    </div>
  </div>
)

export default memo(() => (
  <div className="grid grid-cols-2 gap-2">
    <HuntingGroupGrid />
    <HuntingGroupGrid isPrivate />
    <HuntingGroupGrid />
    <HuntingGroupGrid />
  </div>
))
