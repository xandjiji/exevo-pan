import { avatar as AVATAR } from 'Constants'
import { randomIntFromRange } from '../random'

export const avatar = {
  getRandom: {
    id: () => randomIntFromRange([AVATAR.id.min, AVATAR.id.max]),
    degree: () => randomIntFromRange([AVATAR.degree.min, AVATAR.degree.max]),
  },
  loadSrc: (id: number) => `/sprites/avatars/${id}.gif`,
}
