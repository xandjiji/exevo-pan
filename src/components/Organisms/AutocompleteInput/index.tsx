import { useEffect, useReducer } from 'react'
import { Option } from 'components/Atoms'
import { v4 as uuidv4 } from 'uuid'
import { indexToId } from 'components/Atoms/Listbox/utils'
import * as S from './styles'
import { AutocompleteInputProps } from './types'
import autocompleteInputReducer from './reducer'

const listboxId = uuidv4()

const AutocompleteInput = ({
  itemList = [],
  placeholder,
  onItemSelect,
  ...props
}: AutocompleteInputProps): JSX.Element => {
  const [
    { listboxStatus, highlightedIndex, inputValue, currentList },
    dispatch,
  ] = useReducer(autocompleteInputReducer, {
    listboxStatus: false,
    highlightedIndex: undefined,
    inputValue: '',
    currentList: itemList,
    onItemSelect,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'userTyping', value: event.target.value, list: itemList })
  }

  const handleKeyboard = (event: React.KeyboardEvent) => {
    const action = {
      ArrowUp: () => dispatch({ type: 'arrowNavigation', value: -1 }),
      ArrowDown: () => dispatch({ type: 'arrowNavigation', value: 1 }),
      Enter: () => dispatch({ type: 'optionSelected', list: itemList }),
      NumpadEnter: () => dispatch({ type: 'optionSelected', list: itemList }),
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
