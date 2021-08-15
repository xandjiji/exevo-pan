import styled, { css } from 'styled-components'
import { Smooth } from 'styles'
import { TrackStyleProps } from './types'

const increaseClickableArea = css`
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 30px);
    height: calc(100% + 30px);
  }
`

const fullWindowClickableArea = css`
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
  }
`

export const Track = styled.div<TrackStyleProps>`
  position: relative;
  width: 100%;
  height: 4px;
  background: var(--primaryVariant);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.09);
  cursor: pointer;

  ${increaseClickableArea}
  ${({ active }) => active && fullWindowClickableArea};
`

export const TrackFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--primary);
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    right: 100%;
    top: 0;
    height: 100%;
    width: 7px;
    background-color: var(--primary);
    pointer-events: none;
  }
`

export const Cursor = styled.div`
  margin-top: -8px;
  margin-left: -8px;
  position: absolute;
  top: 50%;
  left: 0;

  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);
  pointer-events: none;
`

const invalidStyle = css`
  background-color: var(--red);
  color: var(--onPrimary);
`

export const SliderInput = styled.input`
  padding: 7px 0;
  width: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: var(--primaryVariant);

  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: var(--onSurface);

  ${Smooth}

  &[aria-invalid='true'] {
    ${invalidStyle}
  }

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const Wrapper = styled.div`
  padding-left: 8px;
  display: flex;
  align-items: center;
  width: 270px;

  ${SliderInput} {
    margin: 0 0 0 12px;
  }
`
