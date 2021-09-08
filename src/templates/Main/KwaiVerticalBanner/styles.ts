import styled from 'styled-components'
import { MagicButton as BaseMagicButton } from 'components/Atoms'
import { Shadow, Smooth } from 'styles'
import KwaiSvg from 'assets/svgs/kwai.svg'

export const Wrapper = styled.section`
  position: fixed;
  top: 50%;
  right: 20px;
  z-index: 1;
  transform: translateY(-50%);

  width: 140px;

  border-radius: 6px;
  background-color: var(--kwai);

  line-height: 1.4;
  ${Shadow}
  ${Smooth}

  > a {
    display: block;
    padding: 16px;
  }

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

export const KwaiLogo = styled(KwaiSvg)`
  width: 100%;
  height: 130px;
`

export const MagicButton = styled(BaseMagicButton)`
  margin: 16px auto;
`

export const ButtonText = styled.span`
  display: block;
  padding: 6px 20px;
  font-size: 16px;
  font-weight: 700;
`

export const BottomText = styled(Heading)`
  && {
    font-size: 16px;
    text-align: center;
  }
`

export const Code = styled.span`
  padding: 6px 12px;
  margin: 16px auto;
  display: block;
  border-radius: 6px;
  background-color: var(--surface);

  font-size: 12px;
  text-align: center;
  color: var(--onSurface);
  font-family: monospace;
`

export const Money = styled.span`
  padding: 6px 12px;
  margin: 10px auto;
  display: block;

  width: fit-content;
  border-radius: 6px;
  background-color: var(--alert);

  text-align: center;
  color: var(--green);
  font-weight: 700;
  letter-spacing: 0.5px;
`
