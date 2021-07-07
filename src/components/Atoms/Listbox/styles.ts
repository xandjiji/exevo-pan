import styled from 'styled-components'
import { Shadow, CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  border-radius: 5px;
  overflow: auto;
  ${Shadow}
  ${CustomScrollbar}

  scrollbar-color: ${({ theme }) => theme.colors.primaryVariant} ${({
    theme,
  }) => theme.colors.surface};

  ::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`
