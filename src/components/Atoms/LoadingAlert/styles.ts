import styled from 'styled-components'
import { Shadow, Spinner as BaseSpinner } from 'styles'

export const FloatingLabel = styled.div`
  position: absolute;
  top: 26px;
  left: 50%;
  z-index: 99;
  transform: translate(-50%);

  padding: 6px 16px;
  display: flex;
  align-items: center;

  border-radius: 5px;
  background-color: var(--alert);

  font-size: 12px;
  font-weight: 600;
  color: #000;

  ${Shadow}
`
export const Spinner = styled(BaseSpinner)`
  margin-right: 8px;
  width: 12px;
  height: 12px;
  background-color: var(--alert);

  &:after {
    background: var(--alert);
  }
`
