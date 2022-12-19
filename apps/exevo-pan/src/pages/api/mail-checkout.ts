import * as nodemailer from 'nodemailer'
import inlineBase64 from 'nodemailer-plugin-inline-base64'
import { v4 as uuidv4 } from 'uuid'
import { EmailTemplate } from 'modules/Advertise/components'
import { isDevelopment } from 'utils'
import { BackofficeClient, NotifyAdminClient } from 'services/server'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getToken } from 'next-auth/jwt'
import { prisma } from 'lib/prisma'
import { advertise } from 'locales'
import { email } from 'Constants'

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

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method, body } = request
  const { selectedDates, selectedCharacter, paymentMethod, paymentCharacter } =
    body as AdvertisePurchase

  if (method !== 'POST') {
    response.status(405).end()
    return
  }

  console.log('email was sent')
  console.log(body)

  const dictionary = advertise[body.locale as keyof typeof advertise]

  if (isDevelopment()) {
    response.status(200).json({ uuid: uuidv4() })
    return
  }

  const token = await getToken({ req: request })
  const { id: uuid } = await prisma.highlightedAuction.create({
    data: {
      auctionId: selectedCharacter.id,
      nickname: selectedCharacter.nickname,
      days: selectedDates.join(),
      email: body.email,
      paymentMethod,
      paymentCharacter: (paymentCharacter as string | undefined)
        ? paymentCharacter
        : undefined,
      user: token
        ? {
            connect: {
              id: token.id,
            },
          }
        : undefined,
    },
  })

  const isPro = !!token?.proStatus
  const html = await EmailTemplate({ ...body, isPro, uuid })

  const customerEmail = {
    from: `Exevo Pan <${email.EXEVOPAN_EMAIL}>`,
    to: body.email,
    subject: dictionary.EmailTitle,
    html,
  }

  const myEmail = {
    ...customerEmail,
    to: email.MY_EMAIL,
    subject: body.selectedCharacter.nickname,
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

  response.status(200).json({ uuid })
}
