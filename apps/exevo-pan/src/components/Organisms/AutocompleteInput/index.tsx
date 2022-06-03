/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useReducer, useCallback, useEffect, memo } from 'react'
import clsx from 'clsx'
import { Popover, Listbox, Option, Input } from 'components/Atoms'
import { useUuid, useIsMounted } from 'hooks'
import { indexToId } from 'components/Atoms/Listbox/utils'
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
  const listboxId = useUuid()

  const [{ listboxStatus, highlightedIndex, inputValue }, dispatch] =
    useReducer(AutocompleteInputReducer, {
      listboxStatus: false,
      highlightedIndex: undefined,
      inputValue: defaultValue?.toString() ?? '',
    })
  const [currentList, setCurrentList] = useState<Option[]>(() =>
    filterByTerm(inputValue, itemList),
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'USER_TYPING', value: event.target.value })
      setCurrentList(filterByTerm(event.target.value, itemList))
    },
    [itemList],
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
        if (currentList.length)
          dispatch({
            type: 'ARROW_NAVIGATION',
            value: -1,
            list: currentList,
          })
        event.preventDefault()
        break
      case 'ArrowDown':
        if (currentList.length)
          dispatch({
            type: 'ARROW_NAVIGATION',
            value: 1,
            list: currentList,
          })
        event.preventDefault()
        break
      case 'Enter':
      case 'NumpadEnter':
        if (currentList.length === 1) {
          onItemSelect?.(currentList[0])
          dispatch({ type: 'OPTION_SELECTED' })
        } else if (highlightedIndex !== undefined) {
          onItemSelect?.(currentList[highlightedIndex])
          dispatch({ type: 'OPTION_SELECTED' })
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (highlightedIndex !== undefined) {
      const item = document.getElementById(
        indexToId(highlightedIndex, listboxId) as string,
      )
      item?.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [highlightedIndex, listboxId])

  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted) setCurrentList(itemList)
  }, [itemList])

  const onSelectOption = useCallback(
    (option: Option) => {
      onItemSelect?.(option)
      dispatch({ type: 'OPTION_SELECTED' })
      setCurrentList(itemList)
    },
    [onItemSelect, itemList],
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
            {currentList.map((item) => (
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
          hasAlert={false}
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
