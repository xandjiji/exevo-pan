import styled from 'styled-components'

export const Shadow = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`

export const Edge = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: var(--darkerPrimary);
`

export const Front = styled.span`
  display: block;
  position: relative;
  border-radius: 12px;
  color: var(--onPrimary);
  background: hsl(345deg 100% 47%);
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  background: var(--primary);
`

export const Pushable = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;

  &:hover {
    filter: brightness(110%);

    ${Front} {
      transform: translateY(-6px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }

    ${Shadow} {
      transform: translateY(4px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }
  }

  &:active {
    ${Front} {
      transform: translateY(-2px);
      transition: transform 34ms;
    }

    ${Shadow} {
      transform: translateY(1px);
      transition: transform 34ms;
    }
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`
