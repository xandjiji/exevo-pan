import clsx from 'clsx'
import { useReducer } from 'react'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Button, CharacterLink, Table, Text } from 'components/Atoms'
import { ChevronDownIcon, TrendingIcon, ViewedIcon } from 'assets/svgs'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'
import { pageSize, queryReducer } from './reducer'

type ReferralHistoryProps = {
  firstPageData: TRPCRouteOutputs['listMyReferralHistoryEntries']
}

export const ReferralHistory = ({ firstPageData }: ReferralHistoryProps) => {
  const translations = useTranslations()
  const i18n = translations.dashboard.Referrals.ReferralHistory

  const [{ pageIndex, list, exhausted }, dispatch] = useReducer(queryReducer, {
    pageIndex: 1,
    pageSize,
    list: firstPageData,
    exhausted: firstPageData.length < pageSize,
  })

  const query = trpc.listMyReferralHistoryEntries.useQuery(
    { pageIndex, pageSize },
    {
      initialData: firstPageData,
      keepPreviousData: true,
      onSuccess: (data) => dispatch({ type: 'UPDATE_LIST', list: data }),
    },
  )

  const isLoading = query.isFetching

  return (
    <Table>
      {list.length > 0 && (
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn />
              <Table.HeadColumn className="text-left">
                {i18n.event}
              </Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {list.map(({ id, type, value, createdAt, withdrawnCharacter }) => (
              <Table.Row
                key={id}
                className={clsx(
                  !!query.data?.find(
                    (lastFetchedItem) => lastFetchedItem.id === id,
                  ) && 'animate-fadeIn',
                )}
              >
                <Table.Column className="w-6 px-3">
                  <div className="h-6 w-6 align-middle opacity-70">
                    {type === 'WITHDRAW' ? (
                      <ViewedIcon className="fill-primaryHighlight" />
                    ) : (
                      <TrendingIcon className="fill-greenHighlight" />
                    )}
                  </div>
                </Table.Column>
                <Table.Column>
                  <div className="grid gap-1 py-0.5">
                    <span className="leading-tight">
                      <strong>
                        {type === 'WITHDRAW' ? i18n.withdraw : i18n.commission}
                      </strong>{' '}
                      <Text.TibiaCoin value={value} className="ml-1" />
                      {!!withdrawnCharacter && (
                        <>
                          {` ${translations.common.to} `}
                          <CharacterLink
                            nickname={withdrawnCharacter}
                            className="!font-bold"
                          >
                            {withdrawnCharacter}
                          </CharacterLink>
                        </>
                      )}
                    </span>

                    <span className="text-tsm font-light opacity-60">
                      {createdAt.toLocaleString('pt-BR', { hour12: false })}
                    </span>
                  </div>
                </Table.Column>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Element>
      )}

      {list.length === 0 && (
        <EmptyState text={i18n.emptyState} variant="medium" className="my-4" />
      )}

      {!exhausted && (
        <Button
          hollow
          pill
          disabled={isLoading}
          className="mx-auto"
          onClick={() => dispatch({ type: 'NEXT_PAGE' })}
        >
          {isLoading ? (
            <div
              role="alert"
              className="loading-spinner fill-onPrimary h-6 w-6"
            />
          ) : (
            <>
              <ChevronDownIcon className="h-6 w-6" />
              {i18n.loadMore}
            </>
          )}
        </Button>
      )}
    </Table>
  )
}
