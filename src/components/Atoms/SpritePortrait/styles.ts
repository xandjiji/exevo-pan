import styled from 'styled-components'
import { Shadow, Spinner as BaseSpinner } from 'styles'
import { VisibilityProps } from './types'

export const Wrapper = styled.div`
  position: relative;
  padding: 8px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primaryVariant};
  user-select: none;

  ${Shadow}
`

export const Img = styled.img<VisibilityProps>`
  position: relative;
  z-index: 1;
  user-select: none;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: opacity 0.2s ease-out;
`

export const Spinner = styled(BaseSpinner)<VisibilityProps>`
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 12px);
  opacity: ${({ visible }) => (visible ? '1' : '0')};

  &:after {
    background-color: ${({ theme }) => theme.colors.primaryVariant};
  }
`
