import styled from 'styled-components'

export const Track = styled.div``

export const Cursor = styled.div``

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
  ${Input} {
    margin: 0 0 0 6px;
  }
`
