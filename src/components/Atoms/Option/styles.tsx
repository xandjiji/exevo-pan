import styled from 'styled-components'

export const Option = styled.option`
  padding: 8px 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  transition: background-color 0.2s ease-out;

  font-size: 12px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.onSurface};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryVariant};
  }
`
