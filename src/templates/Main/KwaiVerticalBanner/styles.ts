import styled from 'styled-components'
import { MagicButton as BaseMagicButton } from 'components/Atoms'
import { Shadow, Smooth } from 'styles'
import KwaiSvg from 'assets/svgs/kwai.svg'

export const Wrapper = styled.section`
  position: fixed;
  top: 50%;
  left: 20px;
  z-index: 1;
  transform: translateY(-50%);

  padding: 16px;
  width: 140px;

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

export const ContainerLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  font-size: 0;
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
  position: relative;
  z-index: 1;
  padding: 6px 12px;
  margin: 16px auto;
  display: block;
  border-radius: 6px;
  background-color: var(--surface);

  font-size: 12px;
  text-align: center;
  color: var(--onSurface);
  font-family: monospace;

  ${Smooth}
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

  &::after {
    content: 'R$10,00';
    margin-left: 3px;
    animation: tickingUp 1.7s ease-out;
  }

  @keyframes tickingUp {
    0% {
      content: 'R$0,00';
    }

    10% {
      content: 'R$1,00';
    }

    20% {
      content: 'R$2,00';
    }

    30% {
      content: 'R$3,00';
    }

    40% {
      content: 'R$4,00';
    }

    50% {
      content: 'R$5,00';
    }

    60% {
      content: 'R$6,00';
    }

    70% {
      content: 'R$7,00';
    }

    80% {
      content: 'R$8,00';
    }

    90% {
      content: 'R$9,00';
    }

    100% {
      content: 'R$10,00';
    }
  }
`
