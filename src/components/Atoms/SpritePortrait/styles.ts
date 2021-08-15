import styled from 'styled-components'
import { Shadow, Spinner as BaseSpinner } from 'styles'

export const Wrapper = styled.div`
  position: relative;
  padding: 8px;
  border-radius: 5px;
  background-color: var(--primaryVariant);
  user-select: none;
  transition: background-color 0.2s ease-out;

  ${Shadow}
`

export const Img = styled.img`
  position: relative;
  z-index: 1;
  user-select: none;
  transition: opacity 0.2s ease-out;

  &[aria-hidden='true'] {
    opacity: 0;
  }
`

export const Spinner = styled(BaseSpinner)`
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 12px);

  &[aria-hidden='true'] {
    opacity: 0;
  }

  &:after {
    background-color: var(--primaryVariant);
  }
`
