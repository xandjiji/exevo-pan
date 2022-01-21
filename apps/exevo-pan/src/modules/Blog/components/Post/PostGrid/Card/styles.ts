import styled, { css } from 'styled-components'

export const Card = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  list-style-type: none;

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

export const ThumbnailWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  height: 56px;
  width: 56px;
  border-radius: 5px;

  background-color: var(--primaryVariant);

  display: grid;
  place-content: center;

  img {
    object-fit: contain;
    opacity: 0;

    transition: opacity 0.2s ease-out;
  }

  &[data-loaded='true'] img {
    opacity: 1;
  }
`

const ellipsedText = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TextWrapper = styled.div`
  ${ellipsedText}
  display: grid;
  gap: 2px;
`

export const Title = styled.h5`
  ${ellipsedText}
  font-size: 16px;
  font-weight: 400;
`

export const Description = styled.p`
  ${ellipsedText}
  font-size: 12px;
  font-weight: 300;
`
