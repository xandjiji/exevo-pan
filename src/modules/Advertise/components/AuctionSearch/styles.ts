import styled from 'styled-components'
import {
  Input as BaseInput,
  Paginator as BasePaginator,
} from 'components/Atoms'
import { MaterialCard } from 'styles'

export const Wrapper = styled.section`
  ${MaterialCard}
`

export const SearchHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

export const InputWrapper = styled.div`
  flex-grow: 1;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`

export const Input = styled(BaseInput)`
  [role='alert'] {
    display: none;
  }
`

export const Paginator = styled(BasePaginator)`
  margin-left: auto;
  width: fit-content;
`

export const AuctionList = styled.div`
  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`
