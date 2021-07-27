import styled from 'styled-components'
import {
  DrawerFooter as BaseDrawerFooter,
  Input as BaseInput,
} from 'components/Atoms'
import { AutocompleteInput as BaseAutocompleteInput } from 'components/Organisms'

export const DrawerFooter = styled(BaseDrawerFooter)`
  flex: none;
`

export const Input = styled(BaseInput)`
  max-width: 200px;

  [role='alert'] {
    display: none;
  }
`

export const ChipWrapper = styled.div`
  margin-bottom: -8px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin-bottom: 8px;
  }

  > *:not(:last-child) {
    margin-right: 8px;
  }
`

export const AutocompleteInput = styled(BaseAutocompleteInput)`
  max-width: 200px;
`

export const FlexWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 16px;
  }
`

export const Emoji = styled.span`
  margin-left: 6px;
  font-size: 12px;
`
