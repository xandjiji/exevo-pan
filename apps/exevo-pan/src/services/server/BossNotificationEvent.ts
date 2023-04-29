import { loadBossSrc } from 'utils'
import { links } from 'Constants'

type PostEventArgs = {
  guildName: string
  server: string
  bossName: string
  notifiedBy: string
  url: string
}

const resolveBossImageSrc = (bossName: string) => {
  const [boss] = bossName.split('(')
  return `${links.CANONICAL}${loadBossSrc(boss.trim())}`
}

export default class BossNotificationEvent {
  static async postEvent(data: PostEventArgs) {
    try {
      const { guildName, server, notifiedBy, bossName, url } = data

      const body = JSON.stringify({
        /* Discord webhook payload */
        username: 'ExevoBot',
        avatar_url: 'https://i.imgur.com/vT3DqTG.png',
        content: 'Boss found! @everyone',
        embeds: [
          {
            color: 4149685,
            author: {
              name: bossName,
              icon_url: resolveBossImageSrc(bossName),
            },
          },
        ],
        /* Generic payload */
        ...data,
      })

      await fetch(url, { body, method: 'POST' })
      return true
    } catch {
      return false
    }
  }
}
