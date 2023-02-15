import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { getToken } from 'next-auth/jwt'
import { prisma } from 'lib/prisma'
import { routes } from 'Constants'

export default function GuildPage() {
  return <div>a</div>
}

const redirect: GetServerSidePropsResult<any> = {
  redirect: {
    destination: routes.BOSSES.HUNTING_GROUPS,
    permanent: false,
  },
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query: { guildName },
  locale,
}) => {
  const token = await getToken({ req })

  if (typeof guildName !== 'string') return redirect

  const [guildMembers, guild] = await Promise.all([
    prisma.guildMember.findMany({
      where: { guild: { name: guildName } },
    }),
    prisma.guild.findUnique({ where: { name: guildName } }),
  ])
  const notMember =
    !token || !guildMembers.some(({ userId }) => userId === token.id)

  if (!guild) return redirect

  return {
    props: {
      guildMembers: guild.private && notMember ? [] : guildMembers,
      guild: notMember
        ? ({ ...guild, messageBoard: null } as typeof guild)
        : guild,
      isMember: !notMember,
      /*
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
        bossTracker: bossTracker[locale as RegisteredLocale],
      }, */
      locale,
    },
  }
}
