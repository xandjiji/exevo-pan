import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Readable } from 'stream'
import { prisma } from 'lib/prisma'
import { DiscordAdmin } from 'services/DiscordAdmin'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

const color = 10617045

export const config = { api: { bodyParser: false } }

function getRawBody(request: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    if (Buffer.isBuffer(request.body)) {
      resolve(request.body)
      return
    }

    const chunks: Buffer[] = []
    const stream = request as unknown as Readable

    stream.on('data', (chunk: Buffer) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const sig = request.headers['stripe-signature']

  if (!sig) {
    console.log('Stripe webhook event with no signature')
    response.status(400).send('No signature')
    return
  }

  const rawBody = await getRawBody(request)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    await DiscordAdmin.shout({
      title: `Webhook signature verification failed`,
      color,
      description: `Error: ${(err as any).message}`,
    })

    response.status(400).send(`Webhook Error: ${(err as any).message}`)
    return
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const paymentIntentId = paymentIntent.id

    try {
      const sessionQuery = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
        expand: ['data.line_items'],
      })

      const checkoutSession = sessionQuery.data[0]

      if (!checkoutSession) {
        await DiscordAdmin.shout({
          title: `Checkout session not found: ${paymentIntentId}`,
          color,
          description: JSON.stringify(paymentIntent),
        })
        response.status(202).send('')
        return
      }

      if (sessionQuery.data.length > 1) {
        await DiscordAdmin.shout({
          title: `Multiple checkout sessions found: ${paymentIntentId}`,
          color,
          description: JSON.stringify(paymentIntent),
        })
        response.status(202).send('')
        return
      }

      const userId = checkoutSession.client_reference_id

      if (!userId) {
        await DiscordAdmin.shout({
          title: `Missing client_reference_id: ${paymentIntentId}`,
          color,
          description: JSON.stringify(paymentIntent),
        })
        response.status(202).send('')
        return
      }

      const foundUser = await prisma.user.findUnique({ where: { id: userId } })

      if (!foundUser) {
        await DiscordAdmin.shout({
          title: `User not found: ${paymentIntentId}`,
          color,
          description: `userId: ${userId}`,
        })
        response.status(208).send('')
        return
      }

      if (foundUser.proStatus) {
        await DiscordAdmin.shout({
          title: `Double payment: ${paymentIntentId}`,
          color,
          description: `userId: ${userId}`,
        })
        response.status(208).send('')
        return
      }

      const item = checkoutSession.line_items?.data[0]

      if (!item) {
        await DiscordAdmin.shout({
          title: `Invalid checkout: ${paymentIntentId}`,
          color,
          description: JSON.stringify(paymentIntent),
        })
        response.status(500).send('')
        return
      }

      const priceId = item.price?.id
      if (!priceId) {
        await DiscordAdmin.shout({
          title: `Price id not found: ${paymentIntentId}`,
          color,
          description: JSON.stringify(paymentIntent),
        })
        response.status(500).send('')
        return
      }

      const amountPaid = paymentIntent.amount / 100
      const currentDate = new Date()

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
                update: {
                  confirmed: true,
                  character: null,
                  lastUpdated: currentDate,
                },
              },
            },
          },
          include: { paymentData: true },
        })

        await tx.transaction.create({
          data: {
            value: Math.round(amountPaid),
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
    } catch (error) {
      await DiscordAdmin.shout({
        title: `Error processing payment: ${paymentIntentId}`,
        color,
        description: `Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      })

      response.status(500).send('Internal server error')
      return
    }
  }

  response.status(204).send('')
}
