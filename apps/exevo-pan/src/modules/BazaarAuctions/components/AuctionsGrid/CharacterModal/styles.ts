import styled from 'styled-components'
import { Accordion as BaseAccordion } from 'components/Atoms'
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
  margin: 12px -12px;
  padding: 0 12px;
  max-height: 50vh;
  overflow: auto;
  ${CustomScrollbar}

  display: grid;
  gap: 16px;
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

export const Accordion = styled(BaseAccordion)`
  margin: -8px 0;
`
