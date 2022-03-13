import styled from 'styled-components'
import { CopyButton as BaseCopyButton } from 'components/Atoms'

export const Text = styled.p`
  font-size: 14px;
  line-height: 1;
`

export const Strong = styled.strong`
  white-space: nowrap;
`

export const Link = styled.a`
  color: var(--primary);
  font-weight: 700;
  letter-spacing: 0.5px;
  filter: brightness(130%);
`

export const CopyButton = styled(BaseCopyButton)`
  margin-left: 1px;
  display: inline-block;
  transform: translateY(6px);
`
