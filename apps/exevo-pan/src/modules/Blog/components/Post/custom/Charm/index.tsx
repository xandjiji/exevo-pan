import Sprite from '../Sprite'

type CharmProps = {
  name: string
  inline?: boolean
}

const SPRITE_PATH = '/sprites/charms'

const Charm = ({ name, inline = false }: CharmProps) => (
  <Sprite
    src={`${SPRITE_PATH}/${name}.png`}
    width={32}
    height={32}
    inline={inline}
  >
    {name}
  </Sprite>
)

export default Charm
