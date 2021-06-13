import styled from 'styled-components'

export const Track = styled.div`
  position: relative;
  width: 160px;
  height: 4px;
  background: var(--primaryVariant);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.09);
  cursor: pointer;
`

export const Cursor = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);

  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);
`

export const Input = styled.input`
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

  ${Input} {
    margin: 0 0 0 6px;
  }
`
