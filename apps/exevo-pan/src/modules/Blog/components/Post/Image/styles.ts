import styled from 'styled-components'
import { Shadow } from 'styles'

export const Figure = styled.figure`
  display: block;

  &[data-align='center'] {
    margin: 0 auto;
  }

  &[data-align='right'] {
    margin-left: auto;
  }

  > span {
    transition: box-shadow 0.2s ease-out;
  }

  img {
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }

  &[data-loaded='true'] {
    > span {
      ${Shadow}
    }

    img {
      opacity: 1;
    }
  }
`

export const Caption = styled.figcaption`
  display: block;

  font-size: 12px;
  text-align: center;
`
