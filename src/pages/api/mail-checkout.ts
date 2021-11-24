/* eslint-disable import/no-extraneous-dependencies */
import * as nodemailer from 'nodemailer'
import inlineBase64 from 'nodemailer-plugin-inline-base64'
import { v4 as uuidv4 } from 'uuid'
import { EmailTemplate } from 'modules/Advertise/components'
import { NotifyAdminClient } from 'services'
import { VercelRequest, VercelResponse } from '@vercel/node'
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
  ])

  response.status(200).json({ uuid })
}
