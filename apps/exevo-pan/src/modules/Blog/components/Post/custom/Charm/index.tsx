/* eslint-disable react/require-default-props */
import styled, { css } from 'styled-components'

type CharmProps = {
  name: string
  inline?: boolean
}

const SPRITE_PATH = '/sprites/charms'

const Wrapper = styled.span<{ name: string; inline: boolean }>`
  position: relative;
  margin-left: 35px;
  font-weight: 400;
  white-space: nowrap;

  ${({ inline }) =>
    inline &&
    css`
      display: inline-block;
      margin-top: 3px;
      margin-bottom: 3px;
    `};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -35px;
    transform: translateY(-50%);

    width: 32px;
    height: 32px;
    background-image: ${({ name }) => `url("${SPRITE_PATH}/${name}.png")`};
  }
`

const Charm = ({ name, inline = false }: CharmProps): JSX.Element => (
  <Wrapper name={name} inline={inline}>
    {name}
  </Wrapper>
)

export default Charm
