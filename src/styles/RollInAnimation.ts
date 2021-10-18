import { css } from 'styled-components'

const RollInAnimation = css`
  animation-timing-function: ease-in;
  animation-duration: 0.8s;
  animation-name: rollIn;

  @keyframes rollIn {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 200deg);
    }
    20% {
      transform: translate3d(75%, 0, 0) rotate3d(0, 0, 1, 150deg);
    }
    40% {
      opacity: 1;
      transform: translate3d(-10%, 0, 0) rotate3d(0, 0, 1, -30deg);
    }
    60% {
      transform: translate3d(5%, 0, 0) rotate3d(0, 0, 1, 15deg);
    }
    to {
      transform: none;
    }
  }
`

export default RollInAnimation
