import styled from 'styled-components'
import {
  Input as BaseInput,
  Popover as BasePopover,
  Listbox as BaseListbox,
} from 'components/Atoms'

export const Wrapper = styled.div`
  position: relative;

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

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`
