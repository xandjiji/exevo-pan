/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import mailchimp from '@mailchimp/mailchimp_marketing'
import { VercelRequest, VercelResponse } from '@vercel/node'

const LIST_ID = process.env.MAILCHIMP_LIST as string

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: process.env.MAILCHIMP_SERVER,
})

const STATUS_MAP = {
  'Member Exists': 'alreadyRegistered',
  'Invalid Resource': 'invalidEmail',
  DEFAULT: 'generic',
}

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { email, locale } = request.body

  try {
    await mailchimp.lists.addListMember(LIST_ID, {
      email_address: email,
      status: 'subscribed',
      tags: [locale],
    })

    response.status(200).json({ message: 'success' })
    return
  } catch (error) {
    const { title } = (error as any).response.body

    response.status(400).json({
      message:
        STATUS_MAP[title as keyof typeof STATUS_MAP] ?? STATUS_MAP.DEFAULT,
    })
  }
}
