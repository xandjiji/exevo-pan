import styled from 'styled-components'
import { Smooth, CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 12px;
  overflow: hidden;
`

export const TabWrapper = styled.div`
  width: 100%;
  border-bottom: solid 1px var(--separator);
  background-color: var(--surface);

  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow-x: auto;
  ${CustomScrollbar}
`

export const Tab = styled.button`
  padding: 8px 16px;
  border-bottom: solid 2px transparent;

  display: flex;
  gap: 3px;

  color: var(--separator);
  font-weight: 700;
  letter-spacing: 0.4px;

  cursor: pointer;
  ${Smooth}

  svg {
    margin-top: -1px;
    fill: var(--separator);
  }

  &[aria-selected='true'] {
    color: var(--primary);
    border-color: var(--primary);

    svg {
      fill: var(--primary);
    }
  }

  &:not([aria-selected='true']):hover {
    color: var(--onSurface);
    background-color: var(--primaryVariantHighlight);

    svg {
      fill: var(--onSurface);
    }
  }
`

export const Panel = styled.div`
  width: 100%;

  &[data-active='false'] {
    display: none;
  }
`
