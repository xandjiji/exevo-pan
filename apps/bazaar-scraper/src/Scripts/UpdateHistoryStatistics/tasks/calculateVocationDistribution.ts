import { broadcast } from 'logging'
import { prisma } from 'services'
import { retryWrapper } from 'utils'

const vocationToId = {
  rooker: 0,
  knight: 1,
  paladin: 2,
  sorcerer: 3,
  druid: 4,
} as const

const getVocationCount = retryWrapper((vocation: keyof typeof vocationToId) =>
  prisma.currentAuction.count({
    where: { vocationId: vocationToId[vocation] },
  }),
)

const PRECISION = 2
const fixedPercentage = (value: number): number =>
  +(value * 100).toFixed(PRECISION)

export const calculateVocationDistribution =
  async (): Promise<DistributionData> => {
    broadcast('Calculating vocation distributions...', 'neutral')

    const vocationCount: Record<keyof typeof vocationToId, number> = {
      rooker: await getVocationCount('rooker'),
      knight: await getVocationCount('knight'),
      paladin: await getVocationCount('paladin'),
      sorcerer: await getVocationCount('sorcerer'),
      druid: await getVocationCount('druid'),
    }

    const totalCount = Object.values(vocationCount).reduce(
      (acc, count) => acc + count,
      0,
    )

    if (totalCount === 0) {
      return {
        rooker: 20,
        knight: 20,
        paladin: 20,
        sorcerer: 20,
        druid: 20,
      }
    }

    return {
      rooker: fixedPercentage(vocationCount.rooker / totalCount),
      knight: fixedPercentage(vocationCount.knight / totalCount),
      paladin: fixedPercentage(vocationCount.paladin / totalCount),
      sorcerer: fixedPercentage(vocationCount.sorcerer / totalCount),
      druid: fixedPercentage(vocationCount.druid / totalCount),
    }
  }
