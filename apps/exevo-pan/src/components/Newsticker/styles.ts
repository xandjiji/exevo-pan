import styled from 'styled-components'
import { FadeImage as BaseFadeImage } from 'components/Atoms'
import { InnerContainer, Shadow, CustomScrollbar, Smooth } from 'styles'
import BaseTag from '../Tag'

export const Wrapper = styled.aside`
  ${InnerContainer}
  padding-top: 12px;
  padding-bottom: 12px;

  display: flex;
  gap: 12px;
  background-color: var(--darkerPrimary);

  overflow: auto;
  ${CustomScrollbar}

  ${Smooth}

  * {
    ${Smooth}
  }

  @media (min-width: 768px) {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export const Card = styled.article`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  flex: none;
  max-width: 80vw;

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

  @media (min-width: 768px) {
    max-width: unset;
  }
`

export const Thumbnail = styled.div`
  padding: 8px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background-color: var(--primaryVariant);

  ${Shadow}
`

export const FadeImage = styled(BaseFadeImage)`
  position: relative;
  width: 48px;
  height: 48px;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Title = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.5px;
  line-height: 1.3;
  color: var(--onPrimary);

  @media (min-width: 768px) {
    font-size: 16px;
  }
`

export const TagWrapper = styled.div`
  display: flex;
  gap: 8px;
`

export const Tag = styled(BaseTag)`
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 10px;

  ${Shadow}
`
