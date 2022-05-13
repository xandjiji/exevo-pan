import styled from 'styled-components'
import { Accordion as BaseAccordion, ActiveCount } from 'components/Atoms'
import { Clickable, Smooth } from 'styles'
import { Label as BaseFilterGroupLabel } from '../FilterGroup'

export const Accordion = styled(BaseAccordion)`
  padding-bottom: 6px;
  margin-top: -9px;
  border-bottom: solid 1px var(--separator);
`

export const AccordionLabel = styled(BaseFilterGroupLabel)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;

  text-align: left;
  cursor: pointer;
`

export const Counter = styled(ActiveCount)`
  font-weight: 700;
`

export const SpriteGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Portrait = styled.button`
  position: relative;
  padding: 8px;
  width: 56px;
  height: 56px;
  border-radius: 5px;
  background-color: var(--primaryVariant);
  user-select: none;

  ${Clickable}
  ${Smooth}

  &[aria-checked='true'] {
    background-color: var(--primary);
    filter: brightness(130%) saturate(80%);
  }
`

export const Sprite = styled.img`
  margin-left: -24px;
  margin-top: -24px;
  pointer-events: none;
`
