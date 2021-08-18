import styled from 'styled-components'

const Spinner = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    var(--primary) 10%,
    rgba(255, 255, 255, 0) 42%
  );
  animation: spinAnimation 1.4s infinite ease-out;
  transition: opacity 0.2s ease-out;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    border-radius: 100% 0 0 0;
    background: var(--primary);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    background: var(--background);
  }

  @keyframes spinAnimation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`

export default Spinner
