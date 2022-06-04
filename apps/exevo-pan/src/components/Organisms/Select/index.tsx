/* eslint-disable jsx-a11y/control-has-associated-label */
import { useReducer, useCallback, useEffect, memo } from 'react'
import clsx from 'clsx'
import { Popover, Listbox, Label } from 'components/Atoms'
import { useUuid } from 'hooks'
import { indexToId } from 'components/Atoms/Listbox/utils'
import { SelectProps } from './types'

const Select = ({
  id: idProp,
  className,
  style,
  'aria-label': ariaLabel,
  label,
  name,
  defaultValue,
  value,
  children,
  ...props
}: SelectProps) => {
  const labelId = useUuid()
  const listboxId = useUuid()
  const uuid = useUuid()
  const inputId = idProp ?? uuid

  const accessibleLabel = typeof label === 'string' ? label : ariaLabel

  /* @ ToDo: abstract to hook */
  /* @ ToDo: use hook in AutocompleteInput (and others?) */
  /* useEffect(() => {
    if (highlightedIndex !== undefined) {
      const item = document.getElementById(
        indexToId(highlightedIndex, listboxId) as string,
      )
      item?.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [highlightedIndex, listboxId]) */

  return (
    <div className={clsx('child:w-full relative', className)} style={style}>
      <Label id={labelId} className="mb-2" htmlFor={inputId}>
        {label}
      </Label>
      <Popover
        placement="bottom"
        trigger="none"
        /* visible={listboxStatus} */
        visible
        content={
          <Listbox
            id={listboxId}
            /* highlightedIndex={highlightedIndex} */
            onSelectOption={(option) => console.log(option)}
            className="max-h-[210px]"
          >
            {children}
          </Listbox>
        }
      >
        <div
          aria-label={accessibleLabel}
          role="combobox"
          aria-expanded="true"
          aria-controls={listboxId}
          aria-owns={listboxId}
          /* value={inputValue} */
          /* onChange={handleChange} */
          /* onFocus={() => dispatch({ type: 'SET_LISTBOX_STATUS', value: true })} */
          /* onClick={() => dispatch({ type: 'SET_LISTBOX_STATUS', value: true })} */
          /* onKeyDown={handleKeyboard} */
          className={clsx(
            'text-tsm text-onSurface border-1 bg-surface flex w-full cursor-text items-center rounded-md border-solid py-2.5 px-4 outline-none transition-all',
            /* isInvalid */ false
              ? 'border-red'
              : 'border-separator focus-within:border-primary',
            /* disabled */ false ? 'bg-separator' : 'bg-surface',
          )}
          {...props}
        >
          {'<Select />'}
        </div>
      </Popover>
      <input
        id={inputId}
        name={name}
        type="hidden"
        aria-label={accessibleLabel}
      />
      <button
        type="button"
        /* onMouseUp={() => dispatch({ type: 'SET_LISTBOX_STATUS', value: false })} */
        /* hidden={!listboxStatus} */
        hidden
        className="fixed top-0 left-0 h-screen w-screen"
      />
    </div>
  )
}

export default memo(Select)
