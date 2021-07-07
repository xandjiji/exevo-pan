import { useState, useEffect, useReducer } from 'react'
import { Option } from 'components/Atoms'
import { v4 as uuidv4 } from 'uuid'
import { indexToId } from 'components/Atoms/Listbox/utils'
import * as S from './styles'
import { filterByTerm } from './utils'
import { AutocompleteInputProps } from './types'
import autocompleteInputReducer from './reducer'

const listboxId = uuidv4()

const AutocompleteInput = ({
  itemList = [],
  placeholder,
  onItemSelect,
  ...props
}: AutocompleteInputProps): JSX.Element => {
  const [currentList, setCurrentList] = useState<Option[]>(itemList)
  const [{ listboxStatus, highlightedIndex, inputValue }, dispatch] =
    useReducer(autocompleteInputReducer, {
      listboxStatus: false,
      highlightedIndex: undefined,
      inputValue: '',
    })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'userTyping', value: event.target.value })
    setCurrentList(filterByTerm(event.target.value, itemList))
  }

  const handleKeyboard = (event: React.KeyboardEvent) => {
    const action = {
      ArrowUp: () =>
        dispatch({ type: 'arrowNavigation', value: -1, list: currentList }),
      ArrowDown: () =>
        dispatch({ type: 'arrowNavigation', value: 1, list: currentList }),
      Enter: () => {
        if (highlightedIndex === undefined) return
        onItemSelect?.(currentList[highlightedIndex])
        dispatch({ type: 'optionSelected' })
      },
      NumpadEnter: () => {
        if (highlightedIndex === undefined) return
        onItemSelect?.(currentList[highlightedIndex])
        dispatch({ type: 'optionSelected' })
      },
    }[event.code]

    if (action) {
      event.preventDefault()
      action()
    }
  }

  useEffect(() => {
    if (highlightedIndex !== undefined) {
      const item = document.getElementById(
        indexToId(highlightedIndex) as string,
      )
      item?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [highlightedIndex])

  useEffect(() => {
    setCurrentList(itemList)
  }, [itemList])

  return (
    <S.Wrapper {...props}>
      <S.Popover
        placement="bottom"
        trigger="none"
        visible={listboxStatus}
        content={
          <S.Listbox id={listboxId} highlightedIndex={highlightedIndex}>
            {currentList.map(item => (
              <Option
                key={item.value}
                value={item.value}
                onMouseDown={() => onItemSelect?.(item)}
              >
                {item.name}
              </Option>
            ))}
          </S.Listbox>
        }
      >
        <S.Input
          aria-haspopup
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={listboxStatus}
          aria-owns={listboxId}
          allowClear
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => dispatch({ type: 'setListboxStatus', value: true })}
          onBlur={() => dispatch({ type: 'setListboxStatus', value: false })}
          onKeyDown={handleKeyboard}
        />
      </S.Popover>
    </S.Wrapper>
  )
}

export default AutocompleteInput
