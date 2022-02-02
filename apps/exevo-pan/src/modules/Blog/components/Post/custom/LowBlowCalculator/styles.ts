import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 8px auto;

  /* RESOLVER */
  width: 420px;

  display: grid;
  gap: 24px;
`

export const Group = styled.div`
  padding: 24px;
  border: solid 1px var(--separator);
  border-radius: 6px;

  display: grid;
  gap: 6px;
`

export const GroupTitle = styled.span`
  margin-bottom: 4px;
  font-weight: 400;
`

export const Label = styled.label`
  font-size: 12px;
`

export const Result = styled.p`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 400;
`
