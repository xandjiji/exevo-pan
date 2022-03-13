import styled from 'styled-components'
import { FadeImage as BaseFadeImage } from 'components/Atoms'

export const Card = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: transparent;
  }

  transition: transform 0.2s ease-out;

  &:hover {
    transform: translateX(4px);
  }
`

export const Thumbnail = styled.div`
  padding: 6px;
  flex-shrink: 0;
  display: grid;
  place-content: center;
  border-radius: 5px;
  background-color: var(--primaryVariant);
`

export const FadeImage = styled(BaseFadeImage)`
  width: 32px;
  height: 32px;
`

export const TextWrapper = styled.div`
  display: grid;
  gap: 2px;
`

export const Title = styled.h4`
  font-size: 16px;
  font-weight: 400;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
