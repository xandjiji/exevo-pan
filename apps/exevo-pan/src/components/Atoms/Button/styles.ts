import styled from 'styled-components'
import { Shadow, Smooth, Spinner } from 'styles'

export const Button = styled.button`
  padding: 12px 24px;

  border-radius: 12px;
  background-color: var(--primary);

  font-size: 24px;
  color: var(--onPrimary);
  cursor: pointer;
  ${Shadow}
  ${Smooth}

  &:hover {
    filter: brightness(110%);
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.14);
  }

  &:active {
    filter: unset;
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
  }

  :disabled:not([data-loading='true']) {
    background-color: var(--separator);
    color: #000;
    opacity: 0.6;
    filter: unset;
    box-shadow: unset;
    cursor: unset;
  }
`

export const LoadingState = styled(Spinner)`
  background: linear-gradient(
    to right,
    var(--primaryVariant) 10%,
    rgba(255, 255, 255, 0) 42%
  );

  &::before {
    background: var(--primaryVariant);
  }

  &::after {
    background: var(--primary);
  }
`
