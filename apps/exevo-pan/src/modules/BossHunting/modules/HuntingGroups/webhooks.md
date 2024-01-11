# Hunting groups Webhook documentation

1. [What is a Webhook](#what-is-a-webhook)
2. [Discord integration (easy)](#discord-integration-easy)
3. [Custom integrations](#custom-integrations)
4. [Custom integration example for Discord](#custom-integration-example-for-discord)

## What is a Webhook

A Webhook is a simple API for different applications to **notify events** to
each other. The hunting group webhook will allow you to consume events (in this
case, a found boss notification) in any application you control

<p align="center">
    <img alt="Webhook" src="https://i.imgur.com/mZIBti2.png">
</p>

## Discord integration (easy)

First you need to choose a channel in your Discord server. All boss notification
events will be posted in this channel mentioning `@everyone`!

Once you have that, create a Webhook URL for the channel at **Edit Channel**:

<p align="center">
    <img alt="Editing a Discord channel" src="https://i.imgur.com/Oxb0lN4.png">
</p>

Then, go to the **Integrations** tab to create a **New Webhook** and copy its
Webhook URL:

<p align="center">
    <img alt="Creating a discord webhook" src="https://i.imgur.com/XfMuZq9.png">
</p>

The webhook URL should look something like this:
`https://discord.com/api/webhooks/1101156871835540426/MQK9bYFHByzD4-c7aqJGoTVjF_0K8nupFZogMm6cLtQJKl4vxpiW74wGFcPyNZUF1JHF`

Finally, paste the Webhook URL in your hunting group configurations and hit
`Save`

<p align="center">
    <img alt="Setting a webhook for hunting groups" src="https://i.imgur.com/9T1wmCR.png">
</p>

---

If you setup everything correctly, you can hit the `Test webhook 🧑‍🔬` button
and a message will pop in your discord channel:

<p align="center">
    <img alt="Discord ExevoBot notification" src="https://i.imgur.com/ymDeosG.png">
</p>

That's it! Your server will now be receiving notifications from ExevoBot 🤖
everytime a member finds a boss!

## Custom integrations

You can consume this webhook event in any other way you'd like. The webhook will
send a `POST` HTTP request with the following JSON in the request body:

```JSON
{
  "guildName": "Sick Sea Serpents",
  "server": "Antica",
  "bossName": "Rotworm Queen",
  "displayedBossName": "Rotworm Queen (Darashia)",
  "notifiedBy": "Eternal Oblivion",
  "url": "https://www.your-webhook-url.com"
}
```

## Custom integration example for Discord

First we need to intercept the default webhook request. We can do it using a
cool technology called **Cloudflare Workers**.

- Register to [Clouflare](https://dash.cloudflare.com/sign-up) and verify your
  e-mail
- Go to `Workers & Pages` and then `Create Worker`
- Select a name for your worker (or use the default one). Save your worker
  endpoint, this will be used later! In this example, our endpoint will be
  `https://example.fhqlfdolvefytliyto.workers.dev`

<p align="center">
    <img alt="Example cloudflare worker" src="https://i.imgur.com/0ZUJ8sC.png">
</p>

- Click the `Deploy` button. Then, lets customize our integration clicking on
  `Edit code`
- Paste in the following code:

```javascript
const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1102658778622611477/Y6xkOHTzmiZb5M8hYRvXr9czbHVHaQYbETNbuEmJ75NWQpXHgm3VhaQuq4JCDGIx707G'

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return handleOptions(request)

    const json = await request.json()
    const {
      guildName,
      server,
      displayedBossName,
      notifiedBy,
      bossName,
      url,
      ...data
    } = json

    /*
        type PostEventArgs = {
            guildName: string
            server: string
            bossName: string
            displayedBossName: string
            lastSpawned?: number // a Unix timestamp of the last time it was manually marked as no chance
            lastCheckedAt?: number // a Unix timestamp of the last time it was checked by a member
            notifiedBy: string
            url: string
        }
    */

    const body = JSON.stringify({
      /* Discord webhook payload */
      ...data,
      // username: 'ExevoBot',
      // avatar_url: 'https://i.imgur.com/vT3DqTG.png',
      // content: `Boss found by ${notifiedBy}! @everyone`,
      // embeds: [
      //  {
      //    author: {
      //      name: displayedBossName,
      //      icon_url: 'https://exevopan.com/sprites/bosses/Yeti.gif',
      //      url: 'https://www.exevopan.com/bosses/hunting-groups/Your-Guild-Name',
      //    },
      //    color: 4149685,
      //    footer: {
      //      text: `${guildName} (${server})`,
      //    },
      //  },
      // ],

      // Overwrite data here. Example:
      content: `Boss found by ${notifiedBy}! @${bossName}`,
    })

    await fetch(DISCORD_WEBHOOK_URL, {
      body,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    return new Response('Ok')
  },
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
}

async function handleOptions(request) {
  if (
    request.headers.get('Origin') !== null &&
    request.headers.get('Access-Control-Request-Method') !== null &&
    request.headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS preflight requests.
    return new Response(null, {
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Headers': request.headers.get(
          'Access-Control-Request-Headers',
        ),
      },
    })
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: 'POST, OPTIONS',
      },
    })
  }
}
```

In the line `1`, you'll need to overwrite your own discord webhook URL.

In the line `8` you will be able to have access to all the default information
that Exevo Pan sends in the request payload

In the line `10`, we are adding the default request payload. The next commented
lines are describing the shape of the payload. This is what the Discord API
expects to receive

In the line `31` you can now overwrite any attribute you want. In our example,
we changed the default `@everyone` mention to a custom boss group mention, like
`@Yeti`

- Once you are done with your customizations, hit the `Save and deploy` button
- Save your new custom endpoint in your Hunting Group configurations, using your
  cloudflare worker URL from the previous step:

<p align="center">
    <img alt="Setting a webhook for hunting groups" src="https://i.imgur.com/bfoIwrg.png">
</p>

And that's it! You can test if everything is working clicking in the
`Test webhook` button!

---

In the future, we will create some simple integration recipes for other popular
apps (like Telegram, Whatsapp, etc).

If you have any suggestions, feel free to send them to:
[xandjiji@gmail.com](mailto:xandjiji@gmail.com)
