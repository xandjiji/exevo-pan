import styled from 'styled-components'
import { Clickable, Shadow } from 'styles'

export const Button = styled.a`
  ${Clickable}
  ${Shadow}

  position: relative;
  padding: 8px 16px 8px 40px;
  margin-left: 8px;
  border-radius: 16px;

  display: flex;
  align-items: flex-end;

  background: linear-gradient(
    270deg,
    var(--primaryVariantHighlight),
    var(--primaryVariant)
  );
  background-size: 800% 800%;
  animation: bgAnimate 3s ease-out infinite;

  color: var(--onSurface);
  font-size: 12px;
  letter-spacing: 0.5px;
  white-space: nowrap;

  transition: 0.2s ease-out filter;

  @keyframes bgAnimate {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  &:hover {
    filter: brightness(110%);
  }

  @media (max-width: 767px) {
    position: fixed;
    bottom: 42px;
    right: 14px;
    z-index: 10;
    background: var(--primary);
    color: var(--onPrimary);
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
  }
`

export const ImgWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);

  width: 24px;
  height: 24px;
`
