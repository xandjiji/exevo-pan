import styled, { css } from 'styled-components'
import Image from 'next/image'
import ExevoPanLogoImage from 'assets/logo.png'
import MoonIconSvg from 'assets/svgs/moon.svg'
import MarketIconSvg from 'assets/svgs/market.svg'
import HistoryIconSvg from 'assets/svgs/history.svg'
import StatisticsIconSvg from 'assets/svgs/statistics.svg'
import { InnerContainer, CustomScrollbar, Clickable } from 'styles'

export const Wrapper = styled.header`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  background-color: var(--primary);
  transition: 0.2s background ease-out;
  ${InnerContainer}
  ${CustomScrollbar}

  &::after {
    content: '';
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
    height: 60px;
    width: 32px;
    background-image: linear-gradient(
      to left,
      var(--primary),
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }
`

export const LogoWrapper = styled.a`
  margin-right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;

  transition: 0.2s filter ease-out;
  &:hover {
    filter: brightness(110%);
  }
`

export const H1 = styled.h1`
  display: none;
`

export const ExevoPanLogo = styled(Image).attrs({
  src: ExevoPanLogoImage,
})``

export const Nav = styled.nav`
  margin-right: 24px;
  display: flex;
`

export const Ul = styled.ul`
  display: flex;
  align-items: center;
`

export const Li = styled.li`
  &:not(:last-child) {
    margin-right: 8px;
  }
`

export const A = styled.a`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-radius: 9px;

  ${Clickable}
  &[aria-current='page'] {
    box-shadow: inset 3px 3px rgb(0 0 0 / 14%);
  }
`

export const H2 = styled.h2`
  font-size: 14px;
  letter-spacing: 0.5px;
  font-weight: 400;
  color: var(--onPrimary);
  white-space: nowrap;
`

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const MoonIcon = styled(MoonIconSvg)``

const NavIconStyle = css`
  margin-right: 6px;
  width: 18px;
  height: 18px;
  fill: var(--onPrimary);
`

export const MarketIcon = styled(MarketIconSvg)`
  ${NavIconStyle}
`
export const HistoryIcon = styled(HistoryIconSvg)`
  ${NavIconStyle}
`

export const StatisticsIcon = styled(StatisticsIconSvg)`
  ${NavIconStyle}
`
