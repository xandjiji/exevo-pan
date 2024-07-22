import { ActiveCount as BaseActiveCount } from 'components/Atoms'
import { loadRawSrc } from 'utils'

const regularSrc = loadRawSrc('/assets/regularSword.gif')
const durableSrc = loadRawSrc('/assets/durableSword.gif')
const lastingSrc = loadRawSrc('/assets/lastingSword.gif')

export const ActiveCount: typeof BaseActiveCount = (args) => (
  <BaseActiveCount
    {...args}
    className="z-1 absolute right-0 -top-2.5 w-fit !rounded p-1 font-bold tracking-wide"
    style={{ transform: 'translateX(33%)' }}
  />
)

export const Weapon = {
  lasting: () => (
    <img
      role="none"
      width={16}
      height={16}
      alt="Lasting exercise weapon"
      src={lastingSrc}
    />
  ),
  durable: () => (
    <img
      role="none"
      width={16}
      height={16}
      alt="Durable exercise weapon"
      src={durableSrc}
    />
  ),
  regular: () => (
    <img
      role="none"
      width={16}
      height={16}
      alt="Regular exercise weapon"
      src={regularSrc}
    />
  ),
}
