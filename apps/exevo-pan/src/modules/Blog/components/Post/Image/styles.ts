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

  > div > div {
    ${Shadow}
  }
`

export const Caption = styled.figure`
  margin-top: 8px;

  font-size: 12px;
  text-align: center;
`
