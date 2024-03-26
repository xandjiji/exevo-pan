import { exevoPro } from 'Constants'
import { getFromLocalStorage, saveToLocalStorage } from './localStorage'
import { isServer } from './isServer'

const LS_KEY = 'exevo-pro-referral'

type Track = {
  coupon: string
}
export const referralTracker = {
  checkUrlAndSetLS: () => {
    if (isServer()) return

    const coupon = new URLSearchParams(window.location.search)
      .get(exevoPro.referral.urlParam)
      ?.toUpperCase()

    if (!coupon) return

    saveToLocalStorage<Track>(LS_KEY, { coupon })
  },
  getFromLS: () => getFromLocalStorage(LS_KEY, { coupon: '' }),
}
