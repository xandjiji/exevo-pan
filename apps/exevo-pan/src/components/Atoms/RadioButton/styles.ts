import styled from 'styled-components'

export const Radio = styled.div`
  position: relative;
  margin-right: 6px;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: solid 2px var(--separator);
  transition: box-shadow 0.2s ease-out;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 50%;
    width: 8px;
    height: 8px;
    background-color: var(--primary);
    transition: opacity 0.2s ease-out;
  }
`
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  font-size: 14px;
  color: var(--onSurface);

  &:hover {
    ${Radio} {
      box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.09);
    }
  }

  &:active {
    ${Radio} {
      box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
    }
  }

  &[aria-checked='false'] {
    ${Radio}::after {
      opacity: 0;
    }
  }
`
