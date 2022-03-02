import styled from 'styled-components'
import { MaterialCard, CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  ${MaterialCard}
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 72;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    max-width: fit-content;
  }
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

export const Grid = styled.div`
  padding-top: 3px;
  display: grid;
  gap: 16px;
`

export const ScrollableContainer = styled.div`
  margin: 0 -12px;
  padding: 0 12px;
  max-height: 60vh;
  overflow-y: auto;
  ${CustomScrollbar}
`

export const Section = styled.div`
  padding-bottom: 12px;
  border-bottom: solid 1px var(--separator);

  display: grid;
  gap: 16px;
`

export const SectionText = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 12px;
  font-weight: 400;
`

export const CoinsValue = styled.strong`
  font-weight: 400;

  &[data-active='true'] {
    color: var(--primary);
    filter: brightness(130%);
    font-weight: 700;
  }
`

export const CheckboxWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 8px;
  grid-auto-flow: column;
`

export const TooltipSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;

  > * {
    width: fit-content;
  }
`
