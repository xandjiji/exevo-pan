import styled from 'styled-components'

export const Head = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &[data-highlighted='true'] p {
    color: var(--green) !important;
  }
`
