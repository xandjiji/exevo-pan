import styled from 'styled-components'
import Image from 'next/image'
import NotFoundImage from 'assets/notFound.png'

export const Wrapper = styled.div`
  position: relative;
  text-align: center;
  border-radius: 24px;
`

export const NotFoundWrapper = styled.div`
  img {
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }

  &[data-loaded='true'] img {
    opacity: 0.15;
  }
`

export const NotFound = styled(Image).attrs({
  objectFit: 'scale-down',
  src: NotFoundImage,
})`
  filter: grayscale(0.5);
`

export const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: center;
`

export const Text = styled.span<{ size: number }>`
  display: block;
  font-size: ${({ size }) => size}px;
  text-align: center;
  white-space: nowrap;
  color: var(--onSurface);
`
