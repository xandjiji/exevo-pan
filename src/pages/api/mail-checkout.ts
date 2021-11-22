/* eslint-disable import/no-extraneous-dependencies */
import * as nodemailer from 'nodemailer'
import inlineBase64 from 'nodemailer-plugin-inline-base64'
import { v4 as uuidv4 } from 'uuid'
import { EmailTemplate } from 'modules/Advertise/components'
import { NotifyAdminClient } from 'services'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { advertise } from 'locales'

const mailCredentials = {
  service: 'gmail',
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.MAILER_EMAIL_ADDRESS,
    pass: process.env.MAILER_EMAIL_PASSWORD,
  },
}

const mailer = nodemailer.createTransport(mailCredentials)
mailer.use('compile', inlineBase64())

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method, body } = request

  if (method !== 'POST') {
    response.status(405).end()
    return
  }

  console.log('email was sent')
  console.log(body)

  const dictionary = advertise[body.locale as keyof typeof advertise]

  const uuid = uuidv4()

  const html = await EmailTemplate({ ...body, uuid })

  const mailOptions = {
    from: `Exevo Pan <${mailCredentials.auth.user}>`,
    to: body.email,
    subject: dictionary.EmailTitle,
    html,
  }

  await Promise.all([
    mailer.sendMail(mailOptions),
    NotifyAdminClient.notifyPurchase(),
  ])

  response.status(200).json({ uuid })
}
