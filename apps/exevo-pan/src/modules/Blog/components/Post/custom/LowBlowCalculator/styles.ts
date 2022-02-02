import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 24px;
  margin: 32px auto;

  /* RESOLVER */
  width: 420px;

  border: solid 1px var(--separator);
  border-radius: 6px;

  display: grid;
  gap: 48px;
`

export const Group = styled.div`
  display: grid;
  gap: 6px;
`

export const GroupTitle = styled.span`
  margin-bottom: 4px;
  font-weight: 400;
  letter-spacing: 0.5px;
`

export const Label = styled.label`
  font-size: 12px;
`
