import styled from 'styled-components'
import Image from 'next/image'
import NotFoundImage from 'assets/notFound.png'

export const Wrapper = styled.div`
  width: 100%;
  padding: 48px;
  position: absolute;
  top: calc(50% - 32px);
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
`

export const NotFoundWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%);
  filter: grayscale(0.5);
  opacity: 0.15;
`

export const NotFound = styled(Image).attrs({
  src: NotFoundImage,
})``

export const Text = styled.span`
  margin-bottom: 32px;
  display: block;
  font-size: 32px;
  text-align: center;
  color: var(--onSurface);
`
