import styled from 'styled-components'
import {
  DrawerFooter as BaseDrawerFooter,
  Input as BaseInput,
} from 'components/Atoms'

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
