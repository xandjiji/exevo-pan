import styled from 'styled-components'
import Image from 'next/image'
import NotFoundImage from 'assets/notFound.png'

export const Wrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`

export const Text = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;

  font-size: 24px;
  font-weight: 400;
  color: var(--onSurface);
  text-align: center;
`

export const NotFound = styled(Image).attrs({
  src: NotFoundImage,
  height: 96,
  objectFit: 'scale-down',
})`
  filter: grayscale(0.5);
  opacity: 0.15;
`
