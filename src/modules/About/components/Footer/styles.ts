import styled from 'styled-components'
import { NegativeContainer, InnerContainer } from 'styles'
import UnlicenseSvg from 'assets/svgs/unlicense.svg'

export const Wrapper = styled.footer`
  ${InnerContainer}
  ${NegativeContainer}
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: var(--primary);

  &,
  a {
    font-size: 10px;
    letter-spacing: 0.5px;
    color: var(--onPrimary);
  }
`

export const Title = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const UnlicenseIcon = styled(UnlicenseSvg)`
  margin: 0 4px;
  width: 12px;
  height: 12px;
  path {
    fill: var(--onPrimary);
  }
`

export const UnlicenseParagraph = styled.p`
  text-align: center;
  line-height: 1.6;
`
