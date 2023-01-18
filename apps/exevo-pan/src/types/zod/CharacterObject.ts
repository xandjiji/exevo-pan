import { z } from 'zod'

export const ServerLocationSchema: z.ZodType<ServerLocation> = z.union([
  z.object({
    string: z.literal('BR'),
    type: z.literal(2),
  }),
  z.object({
    string: z.literal('EU'),
    type: z.literal(0),
  }),
  z.object({
    string: z.literal('NA'),
    type: z.literal(1),
  }),
])

export const PvpTypeSchema: z.ZodType<PvpType> = z.union([
  z.object({
    string: z.literal('Hardcore'),
    type: z.literal(3),
  }),
  z.object({
    string: z.literal('Open'),
    type: z.literal(1),
  }),
  z.object({
    string: z.literal('Optional'),
    type: z.literal(0),
  }),
  z.object({
    string: z.literal('Retro Hardcore'),
    type: z.literal(4),
  }),
  z.object({
    string: z.literal('Retro Open'),
    type: z.literal(2),
  }),
])

export const ServerObjectSchema: z.ZodType<ServerObject> = z.object({
  battleye: z.boolean(),
  experimental: z.boolean(),
  serverId: z.number(),
  serverName: z.string(),
  serverLocation: ServerLocationSchema,
  pvpType: PvpTypeSchema,
})

const CharacterItemSchema: z.ZodType<CharacterItem> = z.object({
  name: z.string(),
  amount: z.number(),
})

const OutfitSchema: z.ZodType<Outfit> = z.object({
  name: z.string(),
  type: z.number(),
})

const CharacterSkillsObjectSchema: z.ZodType<CharacterSkillsObject> = z.object({
  magic: z.number(),
  club: z.number(),
  fist: z.number(),
  sword: z.number(),
  fishing: z.number(),
  axe: z.number(),
  distance: z.number(),
  shielding: z.number(),
})

const HirelingsInfoSchema: z.ZodType<HirelingsInfo> = z.object({
  count: z.number(),
  jobs: z.number(),
  outfits: z.number(),
})

const CharmInfoSchema: z.ZodType<CharmInfo> = z.object({
  expansion: z.boolean(),
  total: z.number(),
  unspent: z.number(),
})

export const CharacterObjectSchema: z.ZodType<CharacterObject> = z.object({
  id: z.number(),
  nickname: z.string(),
  auctionEnd: z.number(),
  currentBid: z.number(),
  hasBeenBidded: z.boolean(),
  outfitId: z.string(),
  serverId: z.number(),
  vocationId: z.number(),
  sex: z.boolean(),
  level: z.number(),
  achievementPoints: z.number(),
  bossPoints: z.number(),
  tcInvested: z.number(),
  tags: z.array(z.string()),
  imbuements: z.array(z.string()),
  items: z.array(z.number()),
  charms: z.array(z.string()),
  transfer: z.boolean(),
  quests: z.array(z.string()),
  storeItems: z.array(CharacterItemSchema),
  outfits: z.array(OutfitSchema),
  storeOutfits: z.array(OutfitSchema),
  mounts: z.array(z.string()),
  storeMounts: z.array(z.string()),
  rareAchievements: z.array(z.string()),
  skills: CharacterSkillsObjectSchema,
  serverData: ServerObjectSchema,
  hirelings: HirelingsInfoSchema,
  preySlot: z.boolean(),
  huntingSlot: z.boolean(),
  charmInfo: CharmInfoSchema,
})
