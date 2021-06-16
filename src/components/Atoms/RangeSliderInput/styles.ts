import styled from 'styled-components'
import { CursorStyleProps } from './types'

export const Track = styled.div`
  position: relative;
  margin: 0 8px;
  width: 160px;
  height: 4px;
  background: var(--primaryVariant);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.09);
  cursor: pointer;
`

export const Cursor = styled.div<CursorStyleProps>`
  margin-top: -8px;
  margin-left: -8px;
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1;

  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    pointer-events: ${({ active }) => (active ? 'unset' : 'none')};
  }
`

export const TrackFill = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  background-color: var(--primary);
  opacity: 0.7;
`

export const SliderInput = styled.input`
  padding: 7px 0;
  width: 40px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: var(--primaryVariant);

  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: var(--onSurface);

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  ${SliderInput} {
    margin: 0 0 0 6px;
  }
`
