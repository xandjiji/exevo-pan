import { z } from 'zod'

export const FilterOptionsSchema: z.ZodType<FilterOptions> = z.object({
  auctionIds: z.set(z.number()),
  nicknameFilter: z.string(),
  vocation: z.set(z.number()),
  pvp: z.set(z.number()),
  battleye: z.set(z.boolean()),
  location: z.set(z.number()),
  serverSet: z.set(z.string()),
  minLevel: z.number(),
  maxLevel: z.number(),
  minSkill: z.number(),
  maxSkill: z.number(),
  bossPoints: z.number(),
  minCharmPoints: z.number(),
  maxCharmPoints: z.number(),
  tcInvested: z.number(),
  tags: z.set(z.string()),
  skillKey: z.set(z.string()),
  imbuementsSet: z.set(z.string()),
  charmsSet: z.set(z.string()),
  rareNick: z.boolean(),
  questSet: z.set(z.string()),
  addon: z.number(),
  sex: z.boolean(),
  outfitSet: z.set(z.string()),
  storeOutfitSet: z.set(z.string()),
  mountSet: z.set(z.string()),
  storeMountSet: z.set(z.string()),
  achievementSet: z.set(z.string()),
  charmExpansion: z.boolean(),
  preySlot: z.boolean(),
  huntingSlot: z.boolean(),
  rewardShrine: z.boolean(),
  imbuementShrine: z.boolean(),
  dummy: z.boolean(),
  mailbox: z.boolean(),
  goldPouch: z.boolean(),
  hireling: z.boolean(),
  transferAvailable: z.boolean(),
  biddedOnly: z.boolean(),
})

export const PaginationOptionsSchema: z.ZodType<PaginationOptions> = z.object({
  pageIndex: z.number(),
  pageSize: z.number(),
})

export const SortOptionsSchema: z.ZodType<SortOptions> = z.object({
  sortingMode: z.number(),
  descendingOrder: z.boolean(),
})
