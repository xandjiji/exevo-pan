import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Shadow, InnerContainer, Smooth } from 'styles'
import { ReactComponent as OverallIconSvg } from 'assets/svgs/charts.svg'
import { ReactComponent as HighscoresIconSvg } from 'assets/svgs/trophy.svg'

export const Nav = styled.nav`
  position: relative;
  z-index: 1;
  ${InnerContainer}
  ${Shadow}
  ${Smooth}
  background-color: ${({ theme }) => theme.colors.darkerPrimary};
`

export const Ul = styled.ul`
  display: flex;
  align-items: center;
`

export const Li = styled.li``

export const Navigation = styled(NavLink)`
  padding: 13px 20px 10px 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.onPrimary};
  white-space: nowrap;
  border-bottom: solid 3px transparent;
  ${Smooth}

  &.active, &:hover {
    border-color: ${({ theme }) => theme.colors.onPrimary};
  }
`

const NavIconStyle = css`
  margin-right: 6px;
  width: 18px;
  height: 18px;
  fill: ${({ theme }) => theme.colors.onPrimary};
`

export const OverallIcon = styled(OverallIconSvg)`
  ${NavIconStyle}
`
export const HighscoresIcon = styled(HighscoresIconSvg)`
  ${NavIconStyle}
`
