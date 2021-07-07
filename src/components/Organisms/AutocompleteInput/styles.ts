import styled from 'styled-components'
import { Input as BaseInput } from 'components/Atoms'

export const Wrapper = styled.div``

export const Input = styled(BaseInput)`
  [role='alert'] {
    display: none;
  }
`
