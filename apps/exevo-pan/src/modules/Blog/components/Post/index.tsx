import styled from 'styled-components'
import { MaterialCard, Smooth, Code } from 'styles'

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 32px 40px;
  margin: 0 auto;
  max-width: clamp(45ch, 50%, 75ch);

  display: grid;
  gap: 16px;

  font-size: 16px;
  line-height: 1.6;
  font-weight: 300;
  color: var(--onSurface);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 32px;
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  strong {
    font-weight: 400;
  }

  a {
    position: relative;
    color: var(--primary);
    filter: brightness(130%);

    ${Smooth}

    &::selection {
      background: var(--primary);
      color: var(--onPrimary);
    }

    &:hover {
      opacity: 0.75;
    }

    &::after {
      content: '';
      position: absolute;
      top: calc(100% - 1px);
      left: 0;
      width: 16px;
      height: 1px;
      background-color: var(--primary);
      opacity: 0.75;
    }
  }

  code {
    ${Code}
    padding: 4px 12px;
    font-size: 16px;
    letter-spacing: 0.5px;
  }
`
