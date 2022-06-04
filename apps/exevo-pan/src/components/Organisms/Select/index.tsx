/* eslint-disable jsx-a11y/control-has-associated-label */
import { useReducer, useCallback, useEffect, memo } from 'react'
import clsx from 'clsx'
import { Popover, Listbox } from 'components/Atoms'
import { useUuid } from 'hooks'
import { indexToId } from 'components/Atoms/Listbox/utils'
import { SelectProps } from './types'

const Select = ({
  className,
  style,
  name,
  defaultValue,
  value,
  children,
  ...props
}: SelectProps) => {
  const listboxId = useUuid()

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
          aria-haspopup
          role="combobox"
          aria-controls="id"
          aria-expanded="true"
          /* aria-expanded={listboxStatus} */
          aria-owns={listboxId}
          /* value={inputValue} */
          /* onChange={handleChange} */
          /* onFocus={() => dispatch({ type: 'SET_LISTBOX_STATUS', value: true })} */
          /* onClick={() => dispatch({ type: 'SET_LISTBOX_STATUS', value: true })} */
          /* onKeyDown={handleKeyboard} */
          {...props}
        >
          {'<Select />'}
        </div>
      </Popover>
      <input name={name} type="hidden" />
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
