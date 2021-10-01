import styled from 'styled-components'
import { Code } from 'styles'

export const Wrapper = styled.div``

export const Payload = styled.span`
  ${Code}
  font-size: 10px;
  word-break: break-all;
`

export const QrCode = styled.img.attrs({ alt: 'AR Code' })`
  display: block;
  margin: 0 auto;
`
