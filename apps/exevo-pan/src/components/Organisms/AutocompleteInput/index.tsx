/* eslint-disable jsx-a11y/control-has-associated-label */
import { useReducer, useCallback, useEffect, useId, memo } from 'react'
import clsx from 'clsx'
import { Popover, Listbox, Option, Input } from 'components/Atoms'
import { filterByTerm } from './utils'
import { AutocompleteInputProps } from './types'
import AutocompleteInputReducer from './reducer'

const AutocompleteInput = ({
  className,
  style,
  itemList = [],
  onItemSelect,
  defaultValue,
  ...props
}: AutocompleteInputProps) => {
  const listboxId = useId()

  const [
    { filteredList, listboxStatus, highlightedIndex, inputValue },
    dispatch,
  ] = useReducer(AutocompleteInputReducer, {
    itemList,
    filteredList: defaultValue
      ? filterByTerm(defaultValue.toString(), itemList)
      : itemList,
    listboxStatus: false,
    highlightedIndex: undefined,
    inputValue: defaultValue?.toString() ?? '',
  })

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'USER_TYPING', value: event.target.value }),
    [],
  )

  const handleKeyboard: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    switch (event.code) {
      case 'Tab':
      case 'Escape':
        dispatch({ type: 'SET_LISTBOX_STATUS', value: false })
        break
      case 'ArrowUp':
      case 'ArrowDown':
        dispatch({
          type: 'ARROW_NAVIGATION',
          code: event.code,
        })
        event.preventDefault()
        break
      case 'Enter':
      case 'NumpadEnter':
        if (filteredList.length === 1) {
          onItemSelect?.(filteredList[0])
          dispatch({ type: 'OPTION_SELECTED' })
        } else if (highlightedIndex !== undefined) {
          onItemSelect?.(filteredList[highlightedIndex])
          dispatch({ type: 'OPTION_SELECTED' })
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    dispatch({ type: 'REDEFINE_LIST', itemList })
  }, [itemList])

  const onSelectOption = useCallback(
    (option: Option) => {
      onItemSelect?.(option)
      dispatch({ type: 'OPTION_SELECTED' })
    },
    [onItemSelect],
  )

  return (
    <div className={clsx('child:w-full relative', className)} style={style}>
      <Popover
        placement="bottom"
        trigger="none"
        visible={listboxStatus}
        content={
          <Listbox
            id={listboxId}
            highlightedIndex={highlightedIndex}
            onSelectOption={onSelectOption}
            className="max-h-[210px]"
          >
            {filteredList.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Listbox>
        }
      >
        <Input
          aria-haspopup
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={listboxStatus}
          aria-owns={listboxId}
          allowClear
          value={inputValue}
          onChange={handleChange}
          onFocus={() => dispatch({ type: 'SET_LISTBOX_STATUS', value: true })}
          onClick={() => dispatch({ type: 'SET_LISTBOX_STATUS', value: true })}
          onKeyDown={handleKeyboard}
          {...props}
        />
      </Popover>
      <button
        type="button"
        onMouseUp={() => dispatch({ type: 'SET_LISTBOX_STATUS', value: false })}
        hidden={!listboxStatus}
        className="fixed top-0 left-0 h-screen w-screen"
      />
    </div>
  )
}

export default memo(AutocompleteInput)
