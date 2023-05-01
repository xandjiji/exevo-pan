# Hunting groups Webhook documentation

1. [What is a Webhook](#what-is-a-webhook)
2. [Discord integration (easy)](#discord-integration-easy)
3. [Custom integrations](#custom-integrations)

## What is a Webhook

A Webhook is a simple API for different applications to **notify events** to each other. The hunting group webhook will allow you to consume events (in this case, a found boss notification) in any application you control

<p align="center">
    <img alt="Webhook" src="https://i.imgur.com/mZIBti2.png">
</p>

## Discord integration (easy)

First you need to choose a channel in your Discord server. All boss notification events will be posted in this channel mentioning `@everyone`!.
Once you have that, create a Webhook URL for the channel at **Edit Channel**:

<p align="center">
    <img alt="Editing a Discord channel" src="https://i.imgur.com/Oxb0lN4.png">
</p>

Then, go to the **Integrations** tab to create a **New Webhook** and copy its Webhook URL:

<p align="center">
    <img alt="Creating a discord webhook" src="https://i.imgur.com/XfMuZq9.png">
</p>

The webhook URL should look something like this:
`https://discord.com/api/webhooks/1101156871835540426/MQK9bYFHByzD4-c7aqJGoTVjF_0K8nupFZogMm6cLtQJKl4vxpiW74wGFcPyNZUF1JHF`

And finally, paste the Webhook URL in your hunting group configurations and hit `Save`

<p align="center">
    <img alt="Setting a webhook for hunting groups" src="https://i.imgur.com/9T1wmCR.png">
</p>

---

If you setup everything correctly, you can hit the `Test webhook 🧑‍🔬` button and a message will pop in your discord channel:

<p align="center">
    <img alt="Discord ExevoBot notification" src="https://i.imgur.com/ymDeosG.png">
</p>

That's it! Your server will now be receiving notifications from ExevoBot 🤖 everytime a member finds a boss!

## Custom integrations

You can consume this webhook event in any other way you'd like. The webhook will send a `POST` HTTP request with the following JSON in the request body:

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

In the feature, we will create some simple integration recipes for other popular apps (like Telegram, Whatsapp, etc). If you have any suggestions, feel free to send them to: [xandjiji@gmail.com](mailto:xandjiji@gmail.com)
