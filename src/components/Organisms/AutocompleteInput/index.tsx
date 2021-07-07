import { useState } from 'react'
import { Option } from 'components/Atoms'
import * as S from './styles'
import { AutocompleteInputProps } from './types'
import { filterByTerm, circularArrayIndex } from './utils'

const AutocompleteInput = ({
  itemList = [],
  placeholder,
  ...props
}: AutocompleteInputProps): JSX.Element => {
  const [listboxStatus, setListboxStatus] = useState<boolean>(false)
  const [highlighted, setHighlighted] = useState<number | undefined>(undefined)
  const [value, setValue] = useState('')
  const [currentList, setCurrentList] = useState<Option[]>(itemList)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    const newList = filterByTerm(inputValue, itemList)

    setValue(inputValue)
    setCurrentList(newList)
    setHighlighted(undefined)
  }

  const handleKeyboard = (event: React.KeyboardEvent) => {
    if (
      (event.code === 'Enter' || event.code === 'NumpadEnter') &&
      highlighted !== undefined
    ) {
      setValue('')
      setCurrentList(itemList)
      setHighlighted(undefined)
      setListboxStatus(false)
      return
    }

    const action = {
      ArrowUp: (index: number) => index - 1,
      ArrowDown: (index: number) => index + 1,
    }[event.code]

    if (!action) return

    event.preventDefault()
    setListboxStatus(true)
    setHighlighted(currentIndex => {
      if (currentIndex === undefined) {
        return 0
      } else {
        return circularArrayIndex(action(currentIndex), currentList)
      }
    })
  }

  return (
    <S.Wrapper {...props}>
      <S.Popover
        placement="bottom"
        trigger="none"
        visible={listboxStatus}
        content={
          <S.Listbox highlightedIndex={highlighted}>
            {currentList.map(item => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </S.Listbox>
        }
      >
        <S.Input
          allowClear
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setListboxStatus(true)}
          onBlur={() => setListboxStatus(false)}
          onKeyDown={handleKeyboard}
        />
      </S.Popover>
    </S.Wrapper>
  )
}

export default AutocompleteInput
