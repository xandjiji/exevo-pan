import styled from 'styled-components'
import { FadeImage } from 'components/Atoms'
import BaseTag from 'components/Tag'
import { MaterialCard, Smooth, Shadow } from 'styles'

export const Thumbnail = styled(FadeImage)`
  position: relative;
  flex-shrink: 0;
  height: 180px;
  width: 100%;

  background: var(--primaryVariantHighlight);
  background-image: linear-gradient(var(--primaryVariant) 2px, transparent 2px),
    linear-gradient(90deg, var(--primaryVariant) 2px, transparent 2px),
    linear-gradient(var(--primaryVariant) 1px, transparent 1px),
    linear-gradient(90deg, var(--primaryVariant) 1px, transparent 1px);
  background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
  transition: background 0.2s ease-out;

  display: grid;
  place-content: center;

  img {
    object-fit: scale-down;
  }
`

export const Wrapper = styled.article`
  ${MaterialCard}
  position: relative;
  top: 0;
  padding: 0;

  display: flex;
  flex-direction: column;

  overflow: hidden;
  list-style-type: none;

  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.09);
  ${Smooth}

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: transparent;
  }

  &:hover {
    top: -3px;
    ${Shadow}
  }

  &:active {
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
  }
`

export const Body = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const Title = styled.h3`
  font-size: 32px;
  color: var(--primaryHighlight);
`

export const Date = styled.p`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.5px;
`

export const Description = styled.p`
  margin: 16px 0;
  flex-grow: 1;
`

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
export const Tag = styled(BaseTag)`
  font-size: 12px;
`
