import styled from 'styled-components'

export const Wrapper = styled.div`
  max-width: min-content;
  font-size: 12px;

  a {
    color: var(--primaryHighlight);
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Separator = styled.span`
  margin: 0 4px;
  &::after {
    content: '>';
    font-weight: 300;
  }
`

export const PostTitle = styled.span``
