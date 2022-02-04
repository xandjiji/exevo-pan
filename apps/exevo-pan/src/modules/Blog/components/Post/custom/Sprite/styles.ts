import styled, { css } from 'styled-components'
import { WrapperProps } from './types'

const SPACE_GAP = 3

export const Wrapper = styled.span<WrapperProps>`
  position: relative;
  margin-left: ${({ width }) => width + SPACE_GAP}px;
  font-weight: 400;
  white-space: nowrap;

  ${({ inline }) =>
    inline &&
    css`
      display: inline-block;
      margin-top: ${SPACE_GAP}px;
      margin-bottom: ${SPACE_GAP}px;
    `};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -${({ width }) => width + SPACE_GAP}px;
    transform: translateY(-50%);

    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    background-image: ${({ src }) => `url("${src}")`};
    background-repeat: no-repeat;
  }
`
