/* eslint-disable import/no-extraneous-dependencies */
import * as nodemailer from 'nodemailer'
import { VercelRequest, VercelResponse } from '@vercel/node'

const mailCreds = {
  service: 'gmail',
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.MAILER_EMAIL_ADDRESS,
    pass: process.env.MAILER_EMAIL_PASSWORD,
  },
}

const mailer = nodemailer.createTransport(mailCreds)

export default (request: VercelRequest, response: VercelResponse): void => {
  const { name = 'World' } = request.query

  const mailOptions = {
    from: mailCreds.auth.user,
    to: 'xandjiji@gmail.com',
    subject: 'Testando 123 alo',
    html: 'deu certo',
  }

  mailer.sendMail(mailOptions)

  response.status(200).send(`Hello ${name}!`)
}
