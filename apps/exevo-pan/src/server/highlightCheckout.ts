import * as nodemailer from 'nodemailer'
import inlineBase64 from 'nodemailer-plugin-inline-base64'
import { v4 as uuidv4 } from 'uuid'
import { calculatePrice } from 'modules/Advertise/utils'
import { EmailTemplate } from 'modules/Advertise/components'
import { AdvertisePurchaseSchema } from 'types/zod/AdvertisePurchase'
import { BackofficeClient, NotifyAdminClient } from 'services/server'
import { prisma } from 'lib/prisma'
import { publicProcedure } from 'server/trpc'
import { isDevelopment, mmddyyyy2ddmmyyy, sortStringDates } from 'utils'
import { advertise } from 'locales'
import { email as emailConstants } from 'Constants'

const { EXEVOPAN_EMAIL, MY_EMAIL } = emailConstants

const mailCredentials = {
  port: 465,
  host: 'smtp.sendgrid.net',
  secure: true,
  auth: {
    user: 'apikey',
    pass: process.env.MAILER_EMAIL_PASSWORD,
  },
}

const authToken = process.env.BACKOFFICE_TOKEN as string

const mailer = nodemailer.createTransport(mailCredentials)
mailer.use('compile', inlineBase64())

export const highlightCheckout = publicProcedure
  .input(AdvertisePurchaseSchema)
  .mutation(async ({ ctx: { token }, input }) => {
    console.log('email was sent')
    console.log(input)

    if (isDevelopment()) {
      return { uuid: uuidv4() }
    }

    const formattedAdvertisePurchase: AdvertisePurchase = {
      ...input,
      selectedDates: input.selectedDates
        .map(mmddyyyy2ddmmyyy)
        .sort(sortStringDates),
    }

    const {
      selectedDates,
      paymentMethod,
      selectedCharacter,
      email,
      paymentCharacter,
      locale,
    } = formattedAdvertisePurchase

    const isPro = !!token?.proStatus
    const price = calculatePrice({
      days: selectedDates.length,
      paymentMethod,
      isPro,
    })

    const { id: uuid } = await prisma.highlightedAuction.create({
      data: {
        auctionId: selectedCharacter.id,
        nickname: selectedCharacter.nickname,
        days: selectedDates.join(),
        email,
        paymentMethod,
        price: price.totalPrice,
        transaction: token
          ? {
              create: {
                value: price.totalPrice,
                currency: paymentMethod === 'PIX' ? 'BRL' : 'TIBIA_COINS',
                type: 'AUCTION_HIGHLIGHT',
                user: { connect: { id: token.id } },
              },
            }
          : undefined,
        paymentCharacter:
          paymentCharacter !== '' ? paymentCharacter : undefined,
        user: token ? { connect: { id: token.id } } : undefined,
      },
    })

    const html = await EmailTemplate({
      ...formattedAdvertisePurchase,
      isPro,
      uuid,
    })
    const { EmailTitle } = advertise[locale as keyof typeof advertise]

    const customerEmail = {
      from: `Exevo Pan <${EXEVOPAN_EMAIL}>`,
      to: email,
      subject: EmailTitle,
      html,
    }

    const myEmail = {
      ...customerEmail,
      to: MY_EMAIL,
      subject: selectedCharacter.nickname,
    }

    await Promise.all([
      mailer.sendMail(customerEmail),
      mailer.sendMail(myEmail),
      NotifyAdminClient.notifyPurchase(),
      BackofficeClient.notifyHighlight({
        id: selectedCharacter.id,
        nickname: selectedCharacter.nickname,
        timestamp: +new Date(),
        days: selectedDates,
        active: true,
        confirmed: false,
        authToken,
      }),
    ])

    return { uuid }
  })
