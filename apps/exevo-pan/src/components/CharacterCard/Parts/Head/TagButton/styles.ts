import styled, { css } from 'styled-components'
import TagSvg from 'assets/svgs/tag.svg'
import AdvertiseSvg from 'assets/svgs/advertise.svg'
import { Smooth } from 'styles'
import { HoveredState } from './types'

export const IconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  --initialAngle: 0deg;
  animation: swing 1.2s ease-out forwards;
  animation-delay: 1s;
  transform-origin: 50% 0;

  @keyframes swing {
    0% {
      transform: rotate3d(0, 0, 1, var(--initialAngle));
    }
    20% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 5deg));
    }
    30% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 7deg));
    }
    50% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 10deg));
    }

    60% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) + 15deg));
    }

    70% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 10deg));
    }

    80% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) + 5deg));
    }

    90% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 2deg));
    }

    100% {
      transform: rotate3d(0, 0, 1, var(--initialAngle));
    }
  }
`

export const TagIcon = styled(TagSvg)`
  width: 100%;
  height: 100%;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
`

export const AdvertiseIcon = styled(AdvertiseSvg)`
  position: absolute;
  top: calc(50% + 6px);
  left: calc(50% - 1px);
  transform: translate(-50%, -50%);
  z-index: 1;

  width: 16px;
  height: 16px;
  fill: #fff;
`

export const Text = styled.p`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;

  font-size: 10px;
  text-align: center;
  color: var(--onSurface);
  ${Smooth}
`

export const Wrapper = styled.div<{ animation: HoveredState }>`
  position: relative;
  align-self: flex-start;
  flex-shrink: 0;
  height: 44px;
  width: 28px;
  cursor: pointer;
  --initialAngle: 0deg;
  --maxAngle: -100deg;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 72px;
  }

  ${IconWrapper} {
    animation: ${({ animation }) => animation} 1s ease-out forwards;
  }

  ${({ animation }) =>
    animation !== 'hover' &&
    css`
      ${Text} {
        opacity: 0;
      }
    `}

  @keyframes hover {
    0% {
      transform: rotate3d(0, 0, 1, var(--initialAngle));
    }
    15% {
      transform: rotate3d(0, 0, 1, var(--maxAngle));
    }
    100% {
      transform: rotate3d(0, 0, 1, var(--maxAngle));
    }
  }

  @keyframes off {
    0% {
      transform: rotate3d(0, 0, 1, var(--maxAngle));
    }

    20% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) + 60deg));
    }

    40% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 40deg));
    }

    60% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) + 20deg));
    }

    80% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 10deg));
    }

    100% {
      transform: rotate3d(0, 0, 1, var(--initialAngle));
    }
  }
`
