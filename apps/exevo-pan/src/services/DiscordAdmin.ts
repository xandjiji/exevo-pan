export class DiscordAdmin {
  static async shout(
    embed: { title: string; description: string; color: number },
    content?: string,
  ) {
    const body = JSON.stringify({
      username: 'Exevo Pan Admin',
      avatar_url: 'https://i.imgur.com/ek4nJl8.png',
      embeds: [embed],
      content,
    })

    try {
      fetch(process.env.ADMIN_DISCORD_WEBHOOK_URL!, {
        body,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (e) {
      console.error(e)
    }
  }
}
