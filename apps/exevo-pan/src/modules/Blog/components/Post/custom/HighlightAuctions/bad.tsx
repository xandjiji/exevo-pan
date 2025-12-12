import { memo } from 'react'
import clsx from 'clsx'
import CharacterCard from 'components/CharacterCard'
import styles from './styles.module.css'

const GoodAuction = () => (
  <CharacterCard
    className={clsx('pointer-events-none mx-auto max-w-[360px]', styles.card)}
    characterData={{
      id: 0,
      nickname: 'Someone Buy Me Plz',
      auctionEnd: 1872167600,
      currentBid: 57,
      hasBeenBidded: true,
      outfitId: '137_1',
      serverId: 65,
      vocationId: 3,
      sex: true,
      level: 547,
      achievementPoints: 201,
      bossPoints: 135,
      tcInvested: 0,
      tags: [],
      skills: {
        magic: 84.43,
        club: 10,
        fist: 13,
        sword: 10,
        fishing: 37,
        axe: 12.14,
        distance: 23.55,
        shielding: 22.67,
      },
      items: [12077],
      transfer: false,
      imbuements: [
        'Axe Skill',
        'Capacity',
        'Club Skill',
        'Death Damage',
        'Death Protection',
        'Distance Skill',
        'Earth Damage',
        'Earth Protection',
        'Energy Damage',
      ],
      quests: [
        'The Order of the Cobra',
        'Feaster of Souls',
        'Dangerous Depths (Warzone 4)',
        'Cults of Tibia',
        'Grimvale',
        'The Dream Courts',
        'Dangerous Depths (Warzone 6)',
        "Bigfoot's Burden (Free boss access)",
        'Dangerous Depths (Warzone 5)',
        'Barbarian Test',
      ],
      greaterGems: [],
      gems: { lesser: 0, greater: 0, regular: 0 },
      storeItems: [],
      outfits: [],
      storeOutfits: [],
      mounts: [],
      storeMounts: [],
      rareAchievements: [],
      hirelings: {
        count: 0,
        jobs: 0,
        outfits: 0,
      },
      huntingSlot: false,
      preySlot: false,
      charmInfo: {
        total: 3354,
        expansion: false,
      },
      serverData: {
        serverId: 65,
        serverName: 'Secura',
        serverLocation: {
          string: 'EU',
          type: 0,
        },
        pvpType: {
          string: 'Optional',
          type: 0,
        },
        battleye: false,
        experimental: false,
      },
      animusMasteries: 0,
    }}
  />
)

export default memo(GoodAuction)
