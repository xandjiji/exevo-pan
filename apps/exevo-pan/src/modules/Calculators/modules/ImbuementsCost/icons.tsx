import Image from 'next/image'
import clsx from 'clsx'
import { SpritePortrait } from 'components/Atoms'
import smallGoldTokenSrc from 'assets/labelGoldToken.png'
import smallMarketSrc from 'assets/labelMarket.png'
import goldTokenSrc from 'assets/goldToken.png'
import marketSrc from 'assets/market.png'
import { Material as MaterialProps, BuyIconProps } from './types'

export const Label = {
  GoldToken: () => (
    <Image src={smallGoldTokenSrc} width={12} height={12} alt="Gold Token" />
  ),
  Market: () => (
    <Image src={smallMarketSrc} width={12} height={12} alt="Market" />
  ),
}

export const GoldToken = ({ highlight }: BuyIconProps) => (
  <SpritePortrait
    src={goldTokenSrc}
    width={32}
    height={32}
    alt="Gold Token"
    className={clsx('transition-all', !highlight && 'opacity-25')}
  />
)

export const Market = ({ highlight }: BuyIconProps) => (
  <SpritePortrait
    src={marketSrc}
    width={32}
    height={32}
    alt="Market"
    className={clsx('transition-all', !highlight && 'opacity-25')}
  />
)

export const Material = ({ src, name, amount }: MaterialProps) => (
  <SpritePortrait
    src={src}
    width={32}
    height={32}
    alt={name}
    title={name}
    counter={
      <span className="after:font-thin after:content-['x']">{amount}</span>
    }
  />
)
