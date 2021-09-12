import styled from 'styled-components'
import Image from 'next/image'
import { InnerContainer, NegativeContainer, Smooth } from 'styles'
import HeroFood from 'assets/herofood.png'

export const Wrapper = styled.section`
  ${InnerContainer}
  ${NegativeContainer}
  padding-top: 64px;
  padding-bottom: 64px;
  background-color: var(--background);
  color: var(--onSurface);

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${Smooth}

  @media (min-width: 768px) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
`

export const HeroImageWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-100%, -50%);
  width: 162px;
  height: 162px;
  user-select: none;

  @media (min-width: 768px) {
    width: unset;
    height: unset;
  }
`

export const HeroImage = styled(Image).attrs({ src: HeroFood })`
  filter: grayscale(0.75);
  opacity: 0.15;
`

export const TitleWrapper = styled.div`
  position: relative;
  z-index: 1;
`

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 400;
  letter-spacing: 0.5px;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 64px;
  }
`

export const Subtitle = styled.span`
  margin-right: 4px;
  margin-left: 118px;
  display: block;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.5px;
  font-style: italic;
  white-space: nowrap;
  opacity: 0.9;

  @media (min-width: 768px) {
    font-size: 18px;
    margin-left: 154px;
  }
`
