import styled from 'styled-components'
import { Clickable } from 'styles'
import AnchorSvg from 'assets/svgs/anchor.svg'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 16px;

  width: fit-content;
`

export const Link = styled.a`
  flex-shrink: 0;
  display: block;
  height: 36px;
  width: 36px;

  filter: none !important;
  opacity: 0.3;

  &&::after {
    content: none;
  }
`

export const AnchorIcon = styled(AnchorSvg)`
  width: 100%;
  height: 100%;
  padding: 2px;
  margin: 0;
  border-radius: 4px;
  fill: var(--onSurface);
  cursor: pointer;
  ${Clickable}
`

export const Heading = styled.h2`
  flex-grow: 1;
`
