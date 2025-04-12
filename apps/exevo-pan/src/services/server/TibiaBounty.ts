import { z } from 'zod'
import { endpoints } from 'Constants'

const entrySchema: z.ZodType<TibiaBountyResponse> = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      value: z.number(),
      target: z.object({
        name: z.string(),
        level: z.number(),
        look_id: z.string(),
        world: z.object({ name: z.string() }),
      }),
    }),
  ),
  count: z.number(),
})

export default class TibiaBounty {
  static async getHighlightedItems(): Promise<TibiaBountyEntry[]> {
    try {
      const response = await fetch(`${endpoints.TIBIA_BOUNTY}?take=4`)

      const payload: TibiaBountyResponse = await response.json()

      const parsed = entrySchema.parse(payload)

      return parsed.data.slice(0, 4)
    } catch {
      return []
    }
  }
}
