import { memo } from 'react'
import clsx from 'clsx'
import { RareFrame } from 'components/Atoms'

type MiniChipProps = { highlight?: boolean } & JSX.IntrinsicElements['div']

const MiniChip = ({
  highlight = false,
  className,
  ...props
}: MiniChipProps) => (
  <div
    className={clsx(
      className,
      'h-2 rounded-md',
      highlight ? 'relative' : 'bg-separator opacity-30',
      !className && 'w-7',
    )}
    {...props}
  >
    {highlight && <RareFrame />}
  </div>
)

const MiniSelect = ({ highlight = false }) => (
  <div className="flex items-end gap-2">
    <div className="grid gap-1">
      <div
        className={clsx(
          'h-1 w-5 rounded',
          highlight ? 'bg-rare' : 'bg-separator opacity-30',
        )}
      />
      <div
        className={clsx(
          'h-3.5 w-12 rounded',
          highlight
            ? 'relative'
            : 'border-1 border-separator border-solid opacity-30',
        )}
      >
        {highlight && <RareFrame />}
      </div>
    </div>

    {!highlight && (
      <div className="mb-1">
        <MiniChip />
      </div>
    )}
  </div>
)

const MiniFilters = () => (
  <div className="child:w-full bg-surface w-[120px] rounded shadow-lg">
    <div className="bg-separator h-5 rounded-t-sm opacity-30" />
    <div className="grid gap-3 p-3">
      <MiniSelect />
      <MiniSelect highlight />

      <div className="flex flex-wrap gap-1">
        <MiniChip highlight className="w-9" />
        <MiniChip highlight className="w-6" />
        <MiniChip />
        <MiniChip className="w-11" />
        <MiniChip className="w-10" />
        <MiniChip className="w-5" />
        <MiniChip className="w-9" />
      </div>
    </div>
    <div className="bg-separator h-5 rounded-b-sm opacity-30" />
  </div>
)

export default memo(MiniFilters)
