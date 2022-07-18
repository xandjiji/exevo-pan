import { SpriteProps } from './types'

const SPACE_GAP = 3

const Sprite = ({
  src,
  width,
  height,
  inline = false,
  children,
}: SpriteProps) => (
  <span
    className="relative whitespace-nowrap font-normal"
    style={{
      display: inline ? 'inline-block' : 'unset',
      marginLeft: width + SPACE_GAP,
      marginTop: inline ? SPACE_GAP : 'unset',
      marginBottom: inline ? SPACE_GAP : 'unset',
    }}
  >
    {children}
    <img
      className="absolute top-1/2 select-none"
      src={src}
      alt={children}
      style={{
        left: -(width + SPACE_GAP),
        width,
        height,
        transform: 'translateY(-50%)',
      }}
    />
  </span>
)

export default Sprite
