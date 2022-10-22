import { tabBroadcast, coloredText } from 'logging'
import { prisma } from 'services'
import { retryWrapper } from 'utils'

const broadcastBy = (by: string) =>
  tabBroadcast(
    `Generating top 10 by ${coloredText(by, 'highlight')}`,
    'neutral',
  )

const baseQuery = {
  take: 10,
  include: {
    rareItems: true,
    server: true,
  },
}

const by = {
  bid: retryWrapper(() => {
    broadcastBy('Bid')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      where: { hasBeenBidded: true },
      orderBy: { currentBid: 'desc' },
    })
  }),
  level: retryWrapper(() => {
    broadcastBy('Level')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      orderBy: { level: 'desc' },
    })
  }),
  magic: retryWrapper(() => {
    broadcastBy('Magic')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      orderBy: { skills: { magic: 'desc' } },
    })
  }),
  club: retryWrapper(() => {
    broadcastBy('Club')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      orderBy: { skills: { club: 'desc' } },
    })
  }),
  fist: retryWrapper(() => {
    broadcastBy('Fist')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      orderBy: { skills: { fist: 'desc' } },
    })
  }),
  sword: retryWrapper(() => {
    broadcastBy('Sword')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      orderBy: { skills: { sword: 'desc' } },
    })
  }),
  fishing: retryWrapper(() => {
    broadcastBy('Fishing')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      orderBy: { skills: { fishing: 'desc' } },
    })
  }),
  axe: retryWrapper(() => {
    broadcastBy('Axe')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      orderBy: { skills: { axe: 'desc' } },
    })
  }),
  distance: retryWrapper(() => {
    broadcastBy('Distance')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      orderBy: { skills: { distance: 'desc' } },
    })
  }),
  shielding: retryWrapper(() => {
    broadcastBy('Shielding')
    return prisma.historyAuction.findMany({
      ...baseQuery,
      orderBy: { skills: { shielding: 'desc' } },
    })
  }),
}

export default by