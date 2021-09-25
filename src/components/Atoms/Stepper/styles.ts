import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const StepItem = styled.button`
  position: relative;
`

export const Circle = styled.div`
  display: grid;
  place-items: center;

  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--separator);

  font-size: 16px;
  font-weight: 700;
  color: var(--onSurface);
`

export const Title = styled.h2`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);

  font-size: 16px;
  letter-spacing: 0.5px;
  color: var(--onSurface);
  white-space: nowrap;
`

export const Separator = styled.div`
  margin: 0 16px;
  flex-grow: 1;
  height: 3px;
  background-color: var(--separator);
  filter: brightness(115%);
`
