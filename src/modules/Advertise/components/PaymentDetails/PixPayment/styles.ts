import styled from 'styled-components'
import { CopyButton as BaseCopyButton } from 'components/Atoms'
import { Code } from 'styles'

export const Wrapper = styled.div``

export const Payload = styled.span`
  ${Code}
  font-size: 10px;
  word-break: break-all;

  display: flex;
  align-items: center;
  gap: 6px;
`

export const QrCode = styled.img.attrs({ alt: 'AR Code' })`
  display: block;
  margin: 0 auto;
`

export const CopyButton = styled(BaseCopyButton)`
  flex-shrink: 0;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.1);

  background-color: var(--primary);
  svg {
    fill: var(--onPrimary);
  }
`
