import styled, { StyledComponent, DefaultTheme } from 'styled-components'
import { Shadow, InnerContainer, Smooth } from 'styles'

export const Nav = styled.nav`
  position: sticky;
  top: 60px;
  z-index: 1;
  ${InnerContainer}
  ${Shadow}
  ${Smooth}
  background-color: var(--darkerPrimary);

  overflow: auto;
` as StyledComponent<'div', DefaultTheme, Record<string, any>, never>

export const Ul = styled.ul`
  display: flex;
  align-items: center;
`

export const Li = styled.li`
  a {
    padding: 13px 20px 10px 20px;
    display: flex;
    align-items: center;
    border-bottom: solid 3px transparent;
    cursor: pointer;
    ${Smooth}

    h3 {
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.5px;
      color: var(--onPrimary);
      white-space: nowrap;
    }

    &[aria-current='page'],
    &:hover {
      border-color: var(--onPrimary);
    }

    svg {
      margin-right: 6px;
      width: 18px;
      height: 18px;
      fill: var(--onPrimary);
    }
  }
`
