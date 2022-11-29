import Image from 'next/image'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
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

export const BuyIcon = ({ type, highlight }: BuyIconProps) => {
  const {
    translations: { calculators },
  } = useTranslations()

  const isGoldToken = type === 'goldToken'
  const name = isGoldToken ? 'Gold Tokens' : 'Market'

  return (
    <SpritePortrait
      src={isGoldToken ? goldTokenSrc : marketSrc}
      width={32}
      height={32}
      alt={name}
      title={
        highlight
          ? `${calculators.ImbuementsCost.buyIconTooltip} ${name}`
          : undefined
      }
      className={clsx('transition-all', !highlight && 'opacity-25')}
    />
  )
}

export const Material = ({ src, name, amount }: MaterialProps) => (
  <SpritePortrait
    src={src}
    width={32}
    height={32}
    alt={name}
    title={name}
    counter={
      <span className="after:font-light after:content-['x']">{amount}</span>
    }
  />
)
