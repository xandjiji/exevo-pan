import { memo } from 'react'
import clsx from 'clsx'
import { RareFrame } from 'components/Atoms'

const MiniBoss = ({ highlight = false }) => (
  <div className="bg-surface relative flex h-12 w-28 items-center gap-2 rounded shadow-md">
    {highlight && <RareFrame />}
    <div className="bg-primaryVariant ml-2 h-7 w-7 rounded-md" />
    <div className="flex flex-col gap-2">
      <div
        className={clsx(
          'h-1 w-12 rounded',
          highlight ? 'bg-rare' : 'bg-onSurface/50',
        )}
      />
      <div className="bg-separator h-1 w-4 rounded" />
    </div>
  </div>
)

const MiniBossGrid = () => (
  <div className="grid w-fit grid-cols-3 gap-2">
    {[1, 2, 3, 4, 5, 6].map((key) => (
      <MiniBoss key={key} highlight={key <= 2} />
    ))}
  </div>
)

export default memo(MiniBossGrid)
