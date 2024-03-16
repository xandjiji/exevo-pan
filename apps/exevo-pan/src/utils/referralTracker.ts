import { exevoPro } from 'Constants'
import { getFromLocalStorage, saveToLocalStorage } from './localStorage'
import { isServer } from './isServer'

const LS_KEY = 'exevo-pro-referral'

export const referralTracker = {
  checkUrlAndSetLS: () => {
    if (isServer()) return

    const coupon = new URLSearchParams(window.location.search).get(
      exevoPro.referral.urlParam,
    )

    if (!coupon) return

    saveToLocalStorage(LS_KEY, coupon)
  },
  getFromLS: () => getFromLocalStorage(LS_KEY, ''),
}
