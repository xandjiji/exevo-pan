import styled, { css } from 'styled-components'
import BaseCharacterCard, {
  CardSkeleton as BaseCardSkeleton,
} from 'components/CharacterCard'

export const Wrapper = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    padding-top: unset;
    position: sticky;
    top: 76px;
  }
`

const mobileCardStyle = css`
  @media (max-width: 767px) {
    > *:first-child {
      margin-bottom: 0;
    }
    > *:not(:first-child) {
      display: none;
    }
  }
`

export const CharacterCard = styled(BaseCharacterCard)<{ smaller: boolean }>`
  ${({ smaller }) => smaller && mobileCardStyle}
`

export const CardSkeleton = styled(BaseCardSkeleton)`
  button {
    display: none;
  }
`
