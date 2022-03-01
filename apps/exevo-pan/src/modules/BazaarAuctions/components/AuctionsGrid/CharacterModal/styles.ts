import styled from 'styled-components'
import { MaterialCard, CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  ${MaterialCard}
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 72;
  transform: translate(-50%, -50%);
  min-width: 360px;
`

export const Backdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 71;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`

export const ScrollableContainer = styled.div`
  margin: 0 -12px;
  padding: 0 12px;
  max-height: 50vh;
  overflow: auto;
  ${CustomScrollbar}
`

export const CheckboxWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 8px;
  grid-auto-flow: column;
`
