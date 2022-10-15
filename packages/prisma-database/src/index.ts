import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const charData = {
  id: 1,
  nickname: 'EU',
  auctionEnd: 1665846000,
  currentBid: 1200,
  hasBeenBidded: true,
  outfitId: '1069_0',
  vocationId: 3,
  sex: false,
  level: 347,
  achievementPoints: 199,
  bossPoints: 20,
  tcInvested: 1770,
  tags: [],
  skills: {
    magic: 90.04,
    club: 14.07,
    fist: 15.01,
    sword: 14.21,
    fishing: 28.18,
    axe: 12.65,
    distance: 12.37,
    shielding: 34.28,
  },
  items: [],
  charms: ['Freeze', 'Poison', 'Zap'],
  transfer: true,
  imbuements: ['Capacity'],
  quests: [
    'The Order of the Cobra',
    'Feaster of Souls',
    'Dangerous Depths (Warzone 4)',
    'Dangerous Depths (Warzone 6)',
    'Dangerous Depths (Warzone 5)',
    'Barbarian Test',
    'Asura Palace',
    'The Order of the Falcon',
    'Rathleton (Citzen)',
    'The Travelling Trader (Rashid)',
    'The Ape City',
    'The Djinn War (blue)',
    'The Ice Islands',
    'The Inquisition',
    'The New Frontier',
    'The Pits of Inferno',
    'The Postman Missions',
    'The Thieves Guild',
    'Wrath of the Emperor',
  ],
  storeItems: [],
  outfits: [
    {
      name: 'Citizen',
      type: 0,
    },
    {
      name: 'Hunter',
      type: 0,
    },
    {
      name: 'Mage',
      type: 1,
    },
    {
      name: 'Knight',
      type: 0,
    },
    {
      name: 'Nobleman',
      type: 0,
    },
    {
      name: 'Summoner',
      type: 0,
    },
    {
      name: 'Warrior',
      type: 0,
    },
    {
      name: 'Barbarian',
      type: 0,
    },
    {
      name: 'Druid',
      type: 0,
    },
    {
      name: 'Wizard',
      type: 0,
    },
    {
      name: 'Oriental',
      type: 1,
    },
    {
      name: 'Shaman',
      type: 0,
    },
    {
      name: 'Norseman',
      type: 0,
    },
    {
      name: 'Demon Hunter',
      type: 3,
    },
    {
      name: 'Yalaharian',
      type: 0,
    },
    {
      name: 'Warmaster',
      type: 3,
    },
    {
      name: 'Wayfarer',
      type: 0,
    },
    {
      name: 'Afflicted',
      type: 0,
    },
    {
      name: 'Demon Outfit',
      type: 1,
    },
    {
      name: 'Battle Mage',
      type: 0,
    },
    {
      name: 'Poltergeist',
      type: 0,
    },
    {
      name: 'Revenant',
      type: 0,
    },
  ],
  storeOutfits: [
    {
      name: 'Retro Warrior',
      type: 0,
    },
  ],
  mounts: ['Blazebringer', 'War Horse', 'Walker'],
  storeMounts: [],
  rareAchievements: [],
  hirelings: {
    count: 0,
    jobs: 0,
    outfits: 0,
  },
  huntingSlot: false,
  preySlot: true,
  charmInfo: {
    unspent: 466,
    total: 2666,
    expansion: false,
  },
  server: {
    connect: { serverName: 'Venebra' },
  },
}

const main = async () => {
  const t0 = +new Date()
  /* const result = await prisma.historyAuction.count({
    where: {
      charms: { hasEvery: ['Dodge', 'Freeze'] },
      bossPoints: { gte: 0, lte: 1050 },
      AND: [
        {
          outfits: {
            some: {
              name: 'Mage',
              type: 1,
            },
          },
        },
        {
          outfits: {
            some: {
              name: 'Hand of the Inquisition',
              type: 3,
            },
          },
        },
      ],
    },
    orderBy: {
      auctionEnd: 'desc',
    },
    skip: 4320,
    take: 10,
  }) */

  /*     await prisma.rareItem.createMany({
    data: [
      { name: 'Maxado', auctionIds: [3] },
      { name: 'Arco', auctionIds: [7] },
    ],
  }) */

  /* await prisma.$transaction([
    prisma.rareItem.deleteMany(),
    prisma.rareItem.createMany({
      data: [
        { name: 'Espada', auctionIds: [1, 2] },
        { name: 'Esckudo', auctionIds: [99, 88] },
      ],
    }),
  ]) */

  /* await prisma.currentAuction.create({ data: charData }) */

  await prisma.rareItem.deleteMany()
  await prisma.currentAuction.deleteMany()

  /* await prisma.rareItem.upsert({
    where: { name_currentAuctionId: { name: 'Espada', currentAuctionId: 2 } },
    create: {
      name: 'Espada',
      auction: { connect: { id: 2 } },
    },
    update: {
      name: 'Espada',
      auction: { connect: { id: 2 } },
    },
  }) */

  /* const result = await prisma.currentAuction.findMany({
    where: {
      RareItem: { some: { name: { equals: 'Espada' } } },
    },
  }) */

  /* const result = await prisma.rareItem.findMany() */

  /* await prisma.currentAuction.delete({ where: { id: 2 } }) */
  const t1 = +new Date()

  /* console.log(result) */
  console.log(`took: ${t1 - t0}ms`)
}

main()
