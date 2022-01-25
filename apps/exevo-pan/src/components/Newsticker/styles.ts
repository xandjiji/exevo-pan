import styled from 'styled-components'
import { FadeImage as BaseFadeImage } from 'components/Atoms'
import {
  InnerContainer,
  NegativeContainer,
  Shadow,
  CustomScrollbar,
  Smooth,
} from 'styles'
import BaseTag from '../Tag'

export const Wrapper = styled.aside`
  ${InnerContainer}
  padding-top: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;

  height: 134px;
  background-color: var(--darkerPrimary);

  ${Smooth}

  * {
    ${Smooth}
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: calc(100% - 6px);
    width: 32px;
    background-image: linear-gradient(
      to left,
      var(--darkerPrimary),
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }

  @media (min-width: 768px) {
    padding-bottom: 12px;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    height: 88px;

    &::after {
      content: unset;
    }
  }
`

export const SectionTitle = styled.h2`
  color: var(--onPrimary);
  letter-spacing: 0.5px;

  @media (min-width: 768px) {
    width: min-content;
  }
`

export const PostWrapper = styled.div`
  ${NegativeContainer}
  padding-bottom: 12px;
  display: flex;
  gap: 12px;

  overflow: auto;
  ${CustomScrollbar}

  &::before, &::after {
    content: '';
    flex: none;
    width: 8px;
  }

  @media (min-width: 768px) {
    padding-bottom: unset;
    margin: unset;
    overflow: unset;
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr 1fr 1fr;

    &::before,
    &::after {
      content: unset;
    }
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
    transform: translateY(-2px);
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
    line-height: unset;
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
