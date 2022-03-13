import styled from 'styled-components'
import { Shadow, Spinner as BaseSpinner } from 'styles'

export const Background = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 5px;

  background-color: var(--primaryVariant);
  user-select: none;
  transition: background-color 0.2s ease-out;
  ${Shadow}
`

export const Wrapper = styled(Background)`
  position: relative;
  padding: 8px;

  img {
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }

  &[data-loaded='true'] img {
    opacity: 1;
  }

  &[data-offset='true'] {
    width: 56px;
    height: 56px;

    > div {
      left: -24px;
      top: -24px;
    }
  }
`

export const Spinner = styled(BaseSpinner)`
  &&& {
    position: absolute;
    top: calc(50% - 12px);
    left: calc(50% - 12px);
  }

  &[aria-hidden='true'] {
    opacity: 0;
  }

  &:after {
    background-color: var(--primaryVariant);
  }
`
