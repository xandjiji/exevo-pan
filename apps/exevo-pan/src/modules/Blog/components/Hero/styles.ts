import styled from 'styled-components'
import { InnerContainer, Smooth } from 'styles'

export const Wrapper = styled.div`
  ${InnerContainer}
  padding-top: 24px;
  padding-bottom: 24px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  ${Smooth}

  @media(min-width: 768px) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
`

export const ImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  filter: grayscale(0.75) brightness(150%);
  opacity: 0.15;
`

export const TitleWrapper = styled.div`
  display: grid;
  gap: 16px;
  position: relative;
  z-index: 1;
`

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  letter-spacing: 0.5px;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`

export const Subtitle = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.5px;
  font-style: italic;
  white-space: nowrap;
  opacity: 0.9;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`
