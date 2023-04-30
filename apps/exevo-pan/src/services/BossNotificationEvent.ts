import { loadBossSrc, resolveGuildUrl } from 'utils'

type PostEventArgs = {
  guildName: string
  server: string
  bossName: string
  displayedBossName: string
  notifiedBy: string
  url: string
}

export default class BossNotificationEvent {
  static async postEvent(data: PostEventArgs) {
    try {
      const {
        guildName,
        server,
        displayedBossName,
        notifiedBy,
        bossName,
        url,
      } = data

      const body = JSON.stringify({
        /* Discord webhook payload */
        username: 'ExevoBot',
        avatar_url: 'https://i.imgur.com/vT3DqTG.png',
        content: `Boss found by ${notifiedBy}! @everyone`,
        embeds: [
          {
            color: 4149685,
            author: {
              name: displayedBossName,
              icon_url: loadBossSrc(bossName),
              url: resolveGuildUrl(guildName),
            },
            footer: {
              text: `${guildName} (${server})`,
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
