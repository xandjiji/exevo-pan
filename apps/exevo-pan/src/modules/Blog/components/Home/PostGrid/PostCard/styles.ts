import styled from 'styled-components'
import { MaterialCard, Smooth, Shadow } from 'styles'
import BaseTag from '../../../Tag'
import { backgroundStyles } from './backgrounds'

const variants = backgroundStyles.length

export const Thumbnail = styled.div<{ seed: number }>`
  position: relative;
  flex-shrink: 0;
  height: 240px;
  width: 100%;
  background: var(--primaryVariantHighlight);
  transition: background 0.2s ease-out;
  ${({ seed }) => backgroundStyles[seed % variants]}

  img {
    object-fit: scale-down;
  }
`

export const Wrapper = styled.li`
  ${MaterialCard}
  padding: 0;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.09);

  position: relative;
  overflow: hidden;
  list-style-type: none;

  display: flex;
  flex-direction: column;

  ${Smooth}

  &:hover {
    ${Shadow}
    transform: translateY(-2px);

    ${Thumbnail}::after {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: transparent;
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
  color: var(--primary);
  filter: brightness(130%);
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
