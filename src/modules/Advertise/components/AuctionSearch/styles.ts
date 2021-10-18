import styled from 'styled-components'
import {
  Input as BaseInput,
  Paginator as BasePaginator,
} from 'components/Atoms'
import { MaterialCard, CustomScrollbar } from 'styles'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 16px;
`

export const SearchHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (min-width: 768px) {
    flex-wrap: unset;
  }
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
  max-height: 256px;
  overflow-y: auto;
  overflow-x: hidden;

  ${CustomScrollbar}

  > * {
    margin-bottom: 8px;
  }

  @media (min-width: 768px) {
    max-height: unset;
  }
`
