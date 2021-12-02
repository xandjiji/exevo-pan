import styled from 'styled-components'
import { Accordion as BaseAccordion } from 'components/Atoms'
import { Shadow } from 'styles'
import { Label as BaseFilterGroupLabel } from '../FilterGroup/styles'

export const Accordion = styled(BaseAccordion)`
  padding-bottom: 6px;
  margin-top: -9px;
  border-bottom: solid 1px var(--separator);
`

export const AccordionLabel = styled(BaseFilterGroupLabel)`
  margin-left: -8px;
  flex: none;
  width: calc(100% - 2px);
  text-align: left;
  cursor: pointer;
`

export const SpriteGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Portrait = styled.div`
  position: relative;
  padding: 8px;
  width: 56px;
  height: 56px;
  border-radius: 5px;
  background-color: var(--primaryVariant);
  user-select: none;
  transition: background-color 0.2s ease-out;

  ${Shadow}

  img {
    margin-left: -24px;
    margin-top: -24px;
  }
`
