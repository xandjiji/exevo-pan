import styled from 'styled-components'

export const Skeleton = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.separator};
  overflow: hidden;
  opacity: 0.6;

  /* @ ToDo: REMOVE */
  width: 40px;
  height: 40px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);

    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.separator},
      transparent
    );
    filter: brightness(85%);

    animation: wave 1.6s linear 0.5s infinite;

    @keyframes wave {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(100%);
      }
    }
  }
`
