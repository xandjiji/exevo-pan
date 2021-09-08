import styled from 'styled-components'
import { Shadow, Smooth } from 'styles'
import KwaiSvg from 'assets/svgs/kwai.svg'

export const Wrapper = styled.section`
  position: fixed;
  top: 50%;
  right: 20px;
  z-index: 1;
  transform: translateY(-50%);
  padding: 16px;

  width: 140px;
  height: 600px;

  border-radius: 6px;
  background-color: var(--kwai);

  line-height: 1.4;
  ${Shadow}
  ${Smooth}

  strong {
    font-weight: 700;
  }

  @media (max-width: 1023px) {
    display: none;
  }
`

export const Heading = styled.h5`
  font-size: 18px;
  font-weight: 300;
  color: #fff;
  letter-spacing: 0.5px;
`

export const KwaiOrange = styled.span`
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--kwai);
`

export const KwaiLogo = styled(KwaiSvg)`
  width: 100%;
  height: 130px;
`
