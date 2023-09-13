import clsx from 'clsx'
import Image from 'next/image'
import yellowSrc from 'assets/yellowbattleye.png'
import greenSrc from 'assets/greenbattleye.png'
import Chip from '../Chip'
import { TibiaCoin } from '../Text'
import SpritePortrait from '../SpritePortrait'

const item = {
  id: 21661,
  item_name: 'Sanguine Bow',
  item_amount: 1,
  item_id: 5124,
  house_id: null,
  item_tier: 0,
  item_look:
    'You see a sanguine bow (Range:6, Atk+9, Hit%+6, distance fighting +4, critical hit chance 10%, critical extra damage +12%, protection earth +6%).\nAugments: (Divine Caldera -> Strong Impact).\nImbuement Slots: 3.\nClassification: 4 Tier: item_tier.\nIt can only be wielded properly by paladins of level 600 or higher.\nIt weighs 47.00 oz.',
  username: 'fendall',
  user_id: 428,
  price: '24000',
  currency_type: 1,
  type: 0,
  world_id: 74,
  world_name: 'Utobra',
  world_pvp_type: 'Open PvP',
  world_battleye_color: 'green',
  created_at: '2023-09-13T12:21:21.359Z',
  is_closed: 0,
  is_rookgaard: false,
  is_user_verified: true,
  likes: 0,
  highlighted_until: '2023-09-13T14:06:39.838Z',
  is_guildhall: false,
}

export const ItemAd = () => (
  <a
    href="https://tibiatrade.gg/trade/Sanguine-Bow-21661"
    className="card flex items-center gap-4"
    target="_blank"
    rel="noreferrer"
  >
    <SpritePortrait
      src="https://tibiatrade.gg/images/item/Sanguine_Bow.gif"
      alt="Sanguine Bow"
      width={32}
      height={32}
    />

    <div className="grid gap-2">
      <strong className="text-tsm tracking-wide">Sanguine Bow</strong>

      <div className="flex items-center gap-2">
        <Chip>Vendendo</Chip>
        <Chip>
          <Image
            role="none"
            alt="Green BattlEye"
            className="pixelated"
            src={greenSrc}
          />{' '}
          Utobra
        </Chip>
        <Chip>
          <TibiaCoin value={24000} />
        </Chip>
      </div>
    </div>
  </a>
)
