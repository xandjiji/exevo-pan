import styled from 'styled-components'
import { MaterialCard, Shadow } from 'styles'
import KwaiSvg from 'assets/svgs/kwai.svg'

export const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  ${MaterialCard}

  display: flex;
  align-items: center;
  gap: 8px;

  background-color: var(--kwai);
  color: #fff;

  transform: translate3d(3000px, 0, 0);
  animation: bounceInRight 1s;
  animation-delay: 2s;
  animation-fill-mode: forwards;

  @media (min-width: 1024px) {
    display: none;
  }

  @keyframes bounceInRight {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
    }
    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      transform: translate3d(10px, 0, 0);
    }
    90% {
      transform: translate3d(-5px, 0, 0);
    }
    to {
      transform: none;
    }
  }
`

export const Heading = styled.h5`
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;

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
  margin: -12px 0 -12px -6px;
  width: 46px;
  height: 46px;
  border-radius: 5px;
  background-color: #fff;
`

export const CloseButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;

  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  ${Shadow}

  &::after, &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);

    width: 2px;
    height: 9px;
    border-radius: 16px;
    background-color: var(--kwai);
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`
