import styled from 'styled-components'
import { MaterialCard, Clickable } from 'styles'
import CrossSvg from 'assets/svgs/cross.svg'

export const Wrapper = styled.div`
  ${MaterialCard}
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 71;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseButton = styled.button`
  ${Clickable}
  float: right;
  display: grid;
  place-items: center;
  border-radius: 4px;
`

export const CloseIcon = styled(CrossSvg)`
  fill: var(--onSurface);
`
