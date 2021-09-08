import styled from 'styled-components'
import { MaterialCard } from 'styles'
import KwaiSvg from 'assets/svgs/kwai.svg'

export const Wrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 20px;
  z-index: 10;
  ${MaterialCard}

  display: flex;
  align-items: center;
  gap: 6px;

  background-color: var(--kwai);
  color: #fff;
`

export const Heading = styled.h5`
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;

  strong {
    font-weight: 700;
  }
`

export const ContainerLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  font-size: 0;
`

export const SubHeading = styled.span`
  display: block;
  font-weight: 300;
`

export const KwaiLogo = styled(KwaiSvg)`
  margin: -12px 0 -12px -8px;
  width: 48px;
  height: 48px;
  border-radius: 5px;
  background-color: #fff;
`
