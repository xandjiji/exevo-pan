import styled from 'styled-components'
import { Smooth } from 'styles'

export const Wrapper = styled.div`
  width: 100%;
`

export const TabWrapper = styled.div`
  width: 100%;
  border-bottom: solid 1px var(--separator);
`

export const Tab = styled.button`
  padding: 8px 16px;
  border-bottom: solid 2px transparent;

  color: var(--separator);
  font-weight: 700;
  letter-spacing: 0.4px;

  cursor: pointer;
  ${Smooth}

  &[aria-selected='true'] {
    color: var(--primary);
    border-color: var(--primary);
  }

  &:hover {
    background-color: var(--primaryVariantHighlight);
  }
`

export const Panel = styled.div`
  width: 100%;
`
