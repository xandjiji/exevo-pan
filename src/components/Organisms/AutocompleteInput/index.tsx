import { useState } from 'react'
import { Option } from 'components/Atoms'
import * as S from './styles'
import { AutocompleteInputProps } from './types'
import { filterByTerm } from './utils'

const AutocompleteInput = ({
  itemList = [],
  placeholder,
  ...props
}: AutocompleteInputProps): JSX.Element => {
  const [listboxStatus, setListboxStatus] = useState<boolean>(false)
  const [value, setValue] = useState('')
  const [currentList, setCurrentList] = useState<Option[]>(itemList)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)

    const newList = filterByTerm(inputValue, itemList)
    setCurrentList(newList)
  }

  return (
    <S.Wrapper {...props}>
      <S.Popover
        placement="bottom"
        trigger="none"
        visible={listboxStatus}
        content={
          <S.Listbox>
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
        />
      </S.Popover>
    </S.Wrapper>
  )
}

export default AutocompleteInput
