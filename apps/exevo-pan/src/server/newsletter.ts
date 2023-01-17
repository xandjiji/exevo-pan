import { z } from 'zod'
import { publicProcedure } from 'server/trpc'
import mailchimp from '@mailchimp/mailchimp_marketing'
import { isDevelopment } from 'utils'

const LIST_ID = process.env.MAILCHIMP_LIST as string

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: process.env.MAILCHIMP_SERVER,
})

const STATUS_MAP = {
  success: 'success',
  'Member Exists': 'alreadyRegistered',
  'Invalid Resource': 'invalidEmail',
  DEFAULT: 'generic',
} as const

export const newsletter = publicProcedure
  .input(
    z.object({
      email: z.string(),
      locale: z.string(),
    }),
  )
  .mutation(async ({ input: { email, locale } }) => {
    if (isDevelopment()) {
      return { message: STATUS_MAP.success }
    }

    try {
      await mailchimp.lists.addListMember(LIST_ID, {
        email_address: email,
        status: 'subscribed',
        tags: [locale],
      })

      return { message: STATUS_MAP.success }
    } catch (error) {
      const { title } = (error as any).response.body

      return {
        message:
          STATUS_MAP[title as keyof typeof STATUS_MAP] ?? STATUS_MAP.DEFAULT,
      }
    }
  })
