import styled, { css } from 'styled-components'
import { Shadow, InnerContainer, Smooth } from 'styles'
import OverallIconSvg from 'assets/svgs/charts.svg'
import HighscoresIconSvg from 'assets/svgs/trophy.svg'

export const Nav = styled.nav`
  position: relative;
  z-index: 1;
  ${InnerContainer}
  ${Shadow}
  ${Smooth}
  background-color: var(--darkerPrimary);
`

export const Ul = styled.ul`
  display: flex;
  align-items: center;
`

export const Li = styled.li``

export const A = styled.a`
  padding: 13px 20px 10px 20px;
  display: flex;
  align-items: center;
  border-bottom: solid 3px transparent;
  cursor: pointer;
  ${Smooth}

  &[aria-current='page'], &:hover {
    border-color: var(--onPrimary);
  }
`

const NavIconStyle = css`
  margin-right: 6px;
  width: 18px;
  height: 18px;
  fill: var(--onPrimary);
`

export const OverallIcon = styled(OverallIconSvg)`
  ${NavIconStyle}
`
export const HighscoresIcon = styled(HighscoresIconSvg)`
  ${NavIconStyle}
`

export const H3 = styled.h3`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: var(--onPrimary);
  white-space: nowrap;
`
