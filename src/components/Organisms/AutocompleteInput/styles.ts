import styled from 'styled-components'
import {
  Input as BaseInput,
  Popover as BasePopover,
  Listbox as BaseListbox,
} from 'components/Atoms'

export const Wrapper = styled.div`
  position: relative;
  width: 500px;

  > * {
    width: 100%;
  }
`

export const Input = styled(BaseInput)`
  [role='alert'] {
    display: none;
  }
`

export const Popover = styled(BasePopover)``

export const Listbox = styled(BaseListbox)`
  max-height: 210px;
`
