import styled from 'styled-components'
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
  }
`

export const CharacterCard = styled(BaseCharacterCard)`
  button {
    display: none;
  }
`

export const CardSkeleton = styled(BaseCardSkeleton)`
  button {
    display: none;
  }
`
