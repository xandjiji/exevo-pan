/* eslint-disable no-await-in-loop */
import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const BATCH_SIZE = 100
const FILE_PATH = './ids.json'

type FrozenBossCheckLogData = {
  boss: string
  member: string
  memberId: string
  checkedAt: number
  location?: string
}

export const stripTime = (date = new Date()): Date =>
  new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())

const getMonthLte = () => {
  const date = new Date()
  date.setUTCDate(0)
  return stripTime(date)
}

const freezeDataFromAGuild = async () => {
  const ids = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
  if (ids.length > 0) return 'NEXT'

  const randomCheckLog = await prisma.bossCheckLog.findFirst({
    select: { checkedAt: true, guild: true },
    orderBy: { checkedAt: 'asc' },
  })

  if (!randomCheckLog) return 'FINISH'
  console.log(randomCheckLog)
  const lte = getMonthLte()

  if (lte.getUTCMonth() === new Date().getUTCMonth()) {
    console.log('found current month data! exiting...')

    return 'FINISH' as const
  }

  console.log(`guild: ${randomCheckLog.guild.name}`)
  console.log(lte)
  const guildId = randomCheckLog.guild.id

  const where = { guildId, checkedAt: { lte } }

  const pastMonthCheckLogs = await prisma.bossCheckLog.findMany({
    where,
    include: { member: { select: { id: true, name: true } } },
  })

  const freezeData: FrozenBossCheckLogData[] = pastMonthCheckLogs.map(
    ({ boss, location, checkedAt, member }) => {
      const entry: FrozenBossCheckLogData = {
        boss,
        memberId: member.id,
        member: member.name,
        checkedAt: +checkedAt,
      }

      if (location) {
        entry.location = location
      }

      return entry
    },
  )

  if (freezeData.length === 0) return 'FINISH' as const

  const toDeleteIds = pastMonthCheckLogs.map(({ id }) => id)

  await prisma.frozenBossCheckLog.create({
    data: {
      guildId,
      frozenAt: lte,
      data: JSON.stringify(freezeData),
    },
  })
  fs.writeFileSync(FILE_PATH, JSON.stringify(toDeleteIds))

  console.log(
    `froze data (${freezeData.length} entries) from: ${randomCheckLog.guild.name}`,
  )

  return 'NEXT' as const
}

const deleteFrozenEntries = async () => {
  const ids = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
  console.log(`deleting ${ids.length} entries...`)

  const leftIds = [...ids]

  let batch = leftIds.splice(0, BATCH_SIZE)
  while (batch.length > 0) {
    console.log(
      `deleting ${batch.length} entries (${leftIds.length} remaining)`,
    )

    await prisma.bossCheckLog.deleteMany({
      where: { id: { in: batch } },
    })
    fs.writeFileSync(FILE_PATH, JSON.stringify(leftIds))

    batch = leftIds.splice(0, BATCH_SIZE)
  }
}

export const freezeDataManually = async () => {
  let state: 'FINISH' | 'NEXT' = 'NEXT'

  while (state === 'NEXT') {
    state = await freezeDataFromAGuild()
    await deleteFrozenEntries()
    const result = await prisma.bossCheckLog.count()

    console.log('\n\ncurrent count:', result)
  }
}
