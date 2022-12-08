/* eslint-disable react/require-default-props */
import { memo } from 'react'
import clsx from 'clsx'

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
      highlight ? 'bg-rare' : 'bg-primary opacity-25',
      !className && 'w-7',
    )}
    {...props}
  />
)

const MiniSelect = ({ highlight = false }) => (
  <div className="flex items-end gap-2">
    <div className="grid gap-1">
      <div
        className={clsx(
          'h-1 w-7 rounded',
          highlight ? 'bg-rare' : 'bg-separator opacity-60',
        )}
      />
      <div
        className={clsx(
          'border-1 h-4 w-16 rounded border-solid',
          highlight ? 'border-rare' : 'border-separator opacity-60',
        )}
      />
    </div>

    {!highlight && (
      <div className="mb-1">
        <MiniChip />
      </div>
    )}
  </div>
)

const MiniFilters = () => (
  <div className="child:w-full w-36 rounded shadow-md">
    <div className="bg-primaryVariant h-5 rounded-t opacity-50" />
    <div className="bg-surface grid gap-4 p-3">
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
    <div className="bg-primaryVariant h-5 rounded-b opacity-50" />
  </div>
)

export default memo(MiniFilters)
