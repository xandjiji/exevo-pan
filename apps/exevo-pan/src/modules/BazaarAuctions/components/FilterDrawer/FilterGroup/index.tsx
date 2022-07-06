/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react'
import clsx from 'clsx'
import { Sticker, Label } from 'components/Atoms'
import { FilterGroupProps } from './types'

const FilterGroup = ({
  newSticker = false,
  label,
  htmlFor,
  children,
  className,
  style,
  ...props
}: FilterGroupProps) => (
  <div
    className={clsx('border-separator border-solid pb-4', className)}
    style={{ borderWidth: 0, borderBottomWidth: 1, ...style }}
    {...props}
  >
    {label && (
      <Label htmlFor={htmlFor} className="relative mb-2 block">
        {newSticker && (
          <Sticker
            localStorageKey={label}
            className="absolute bottom-full right-full"
            style={{ transform: 'rotate(-15deg)' }}
          >
            New
          </Sticker>
        )}
        {label}
      </Label>
    )}

    {children}
  </div>
)

export default memo(FilterGroup)
