import styled from 'styled-components'
import { Smooth } from 'styles'

export const Aside = styled.aside`
  @media (min-width: 768px) {
    position: sticky;
    top: 60px;
    left: 0;
  }
`

export const Nav = styled.nav`
  position: absolute;
  right: 100%;
  margin-right: 24px;
`

export const Title = styled.h3`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 400;
  color: var(--onSurface);
`

export const Ul = styled.ul`
  padding: 6px 12px;
  border-left: solid 1px var(--separator);

  > *:not(:last-child) {
    margin-bottom: 12px;
  }
`

export const Li = styled.li`
  a {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.6;
    color: var(--onSurface);
    white-space: nowrap;
    ${Smooth}
  }

  &::before {
    content: '·';
    margin-right: 6px;
    font-weight: 700;
    color: var(--onSurface);
    ${Smooth}
  }

  &[aria-current='step'] {
    a,
    &::before {
      color: var(--primary);
      filter: brightness(130%);
    }
  }
`
