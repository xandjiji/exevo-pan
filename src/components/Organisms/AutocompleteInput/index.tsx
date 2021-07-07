import { useState } from 'react'
import { Listbox, Option } from 'components/Atoms'
import * as S from './styles'
import { AutocompleteInputProps } from './types'
import { filterByTerm } from './utils'

const AutocompleteInput = ({
  itemList = [],
  placeholder,
  ...props
}: AutocompleteInputProps): JSX.Element => {
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
      <S.Input
        allowClear
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <Listbox>
        {currentList.map(item => (
          <Option key={item.value} value={item.value}>
            {item.name}
          </Option>
        ))}
      </Listbox>
    </S.Wrapper>
  )
}

export default AutocompleteInput
