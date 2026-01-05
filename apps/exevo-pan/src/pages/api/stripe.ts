import type { VercelRequest, VercelResponse } from '@vercel/node'
import { prisma } from 'lib/prisma'
import { DiscordAdmin } from 'services/DiscordAdmin'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

const color = 10617045

export default async (request: VercelRequest, response: VercelResponse) => {
  const sig = request.headers['stripe-signature']

  let event
  if (!sig) {
    console.log('Stripe webhook event with no signature')
    response.status(400).send('No signature')
    return
  }

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      STRIPE_WEBHOOK_SECRET,
    )
  } catch (err) {
    await DiscordAdmin.shout({
      title: `Unknown error`,
      color: 10617045,
      description: JSON.stringify(event?.data.object),
    })

    response.status(400).send(`Webhook Error: ${(err as any).message}`)
    return
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object.id

    const sessionQuery = await stripe.checkout.sessions.list({
      payment_intent: paymentIntent,
      expand: ['data.line_items'],
    })

    const checkoutSession = sessionQuery.data[0]

    if (!checkoutSession) {
      await DiscordAdmin.shout({
        title: `Missing checkout session not found: ${paymentIntent}`,
        color,
        description: JSON.stringify(event.data.object),
      })
      response.status(202).send('')
      return
    }

    if (sessionQuery.data.length > 1) {
      await DiscordAdmin.shout({
        title: `Multiple chekout sessions found: ${paymentIntent}`,
        color,
        description: JSON.stringify(event.data.object),
      })
      response.status(202).send('')
      return
    }

    const userId = checkoutSession.client_reference_id

    if (!userId) {
      await DiscordAdmin.shout({
        title: `Missing client_reference_id: ${paymentIntent}`,
        color,
        description: JSON.stringify(event.data.object),
      })
      response.status(202).send('')
      return
    }

    const foundUser = await prisma.user.findUnique({ where: { id: userId } })
    if (foundUser?.proStatus) {
      response.status(208).send('')
      return
    }

    const item = checkoutSession.line_items?.data[0]

    if (!item) {
      await DiscordAdmin.shout({
        title: `Invalid checkout: ${paymentIntent}`,
        color,
        description: JSON.stringify(event.data.object),
      })
      response.status(500).send('')
      return
    }

    const priceId = item.price?.id
    if (!priceId) {
      await DiscordAdmin.shout({
        title: `Price id not found: ${paymentIntent}`,
        color,
        description: JSON.stringify(event.data.object),
      })
      response.status(500).send('')
      return
    }

    const currentDate = new Date().toISOString()
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: {
          proStatus: true,
          proSince: currentDate,
          paymentData: {
            upsert: {
              create: {
                character: null,
                confirmed: true,
                lastUpdated: currentDate,
              },
              update: { confirmed: true, character: null },
            },
          },
        },

        include: { paymentData: true },
      })

      await tx.transaction.create({
        data: {
          value: 50,
          currency: 'BRL',
          type: 'EXEVO_PRO',
          date: currentDate,
          user: { connect: { id: userId } },
          exevoProPayment: { connect: { id: user.paymentData?.id } },
        },
      })
    })

    response.status(200).send('')
    return
  }

  response.status(204).send('')
}

export const config = {
  runtime: 'experimental-edge',
}
