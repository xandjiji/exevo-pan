/* eslint-disable camelcase */

declare type TibiaBountyEntry = {
  _id: stirng
  target: {
    name: string
    level: number
    look_id: string
    world: { name: string }
  }
  value: number
}

declare type TibiaBountyResponse = {
  data: TibiaBountyEntry[]
  count: number
}
