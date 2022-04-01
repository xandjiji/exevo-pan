import styled from 'styled-components'

export const Ul = styled.ul`
  margin-left: auto;
  margin-right: auto;
  min-width: fit-content;
  display: grid;
  row-gap: 8px;
  column-gap: 12px;
  grid-template-columns: 1fr;

  @media (min-width: 360px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 520px) and (max-width: 1023px), (min-width: 1200px) {
    grid-template-rows: 1fr 1fr 1fr;
    grid-auto-flow: column;
  }
`

export const Li = styled.li`
  font-size: 12px;
  white-space: nowrap;

  &&:before {
    content: none;
  }
`

export const Percentage = styled.span`
  display: inline-block;
  padding: 2px 4px;
  min-width: 44px;
  border-radius: 5px;
  background-color: var(--primary);

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-align: right;
  color: var(--onPrimary);
`
