import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { Skeleton } from 'components/Atoms'
import { HeadWrapper } from '../Parts/Head'
import * as S from '../atoms'
import * as Skeletons from './atoms'

const CardSkeleton = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { common } = useTranslations()

  return (
    <S.Wrapper {...props}>
      <HeadWrapper style={{ alignItems: 'center', gap: 0, marginBottom: 22 }}>
        <Skeleton className="h-14 w-14 shrink-0 rounded-md" />
        <div className="mx-4 grid w-full gap-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-2 w-3/4" />
        </div>
      </HeadWrapper>

      <S.InfoGrid className="mb-3">
        <Skeletons.LabeledTextBox labelText="Server">
          <Skeletons.LabelledFlex>
            <Skeleton className="mr-1 h-2.5 w-4" />
            <Skeleton className="h-3 w-2/5" />
            <Skeleton className="ml-auto h-4 w-4 rounded-full" />
          </Skeletons.LabelledFlex>
        </Skeletons.LabeledTextBox>
        <Skeletons.LabeledTextBox labelText="PvP">
          <Skeletons.LabelledFlex>
            <Skeleton className="mr-1 h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3/4" />
          </Skeletons.LabelledFlex>
        </Skeletons.LabeledTextBox>
        <Skeletons.LabeledTextBox
          labelText={common.CharacterCard.AuctionStatus}
        >
          <Skeleton className="h-3 w-3/5" />
        </Skeletons.LabeledTextBox>

        <Skeletons.LabeledTextBox labelText={common.CharacterCard.BidStatus}>
          <Skeletons.LabelledFlex>
            <Skeleton className="mr-1 h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-1/2" />
          </Skeletons.LabelledFlex>
        </Skeletons.LabeledTextBox>
      </S.InfoGrid>

      <div className="mb-3 flex w-full justify-around">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-12 w-12 shrink-0 rounded-md" />
        ))}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="flex items-end gap-1.5">
            <Skeleton className="h-[22px] w-8 shrink-0 rounded-md" />
            <div className="grid w-full gap-1">
              <Skeleton className="mb-[3x] h-1.5 w-12" />
              <Skeleton className="h-1 w-full" />
            </div>
          </div>
        ))}
      </div>

      <S.FlexFooter className="mb-3">
        <S.FlexColumn>
          <Skeletons.ImbuementFlex>
            <Skeletons.ImbuementsIcon />
            <Skeleton className="h-2.5 w-[126px]" />
          </Skeletons.ImbuementFlex>
          <Skeletons.ImbuementFlex>
            <Skeletons.ImbuementsIcon />
            <Skeleton className="h-2.5 w-[100px]" />
          </Skeletons.ImbuementFlex>
          <Skeletons.ImbuementFlex>
            <Skeletons.ImbuementsIcon />
            <Skeleton className="h-2.5 w-[100px]" />
          </Skeletons.ImbuementFlex>
          <Skeletons.ImbuementFlex>
            <Skeletons.ImbuementsIcon />
            <Skeleton className="h-2.5 w-[88px]" />
          </Skeletons.ImbuementFlex>
        </S.FlexColumn>

        <S.FlexColumn>
          <Skeletons.ImbuementFlex>
            <Skeletons.ImbuementsIcon />
            <Skeleton className="h-2.5 w-[110px]" />
          </Skeletons.ImbuementFlex>
          <Skeletons.ImbuementFlex>
            <Skeletons.ImbuementsIcon />
            <Skeleton className="h-2.5 w-14" />
          </Skeletons.ImbuementFlex>
          <Skeletons.ImbuementFlex>
            <Skeletons.ImbuementsIcon />
            <Skeleton className="h-2.5 w-16" />
          </Skeletons.ImbuementFlex>
          <Skeletons.ImbuementFlex>
            <Skeletons.ImbuementsIcon />
            <Skeleton className="h-2.5 w-20" />
          </Skeletons.ImbuementFlex>
        </S.FlexColumn>
      </S.FlexFooter>

      <Skeletons.Flex className="gap-2">
        <Skeleton className="h-6 w-24 rounded-lg" />
        <Skeleton className="h-6 w-14 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-lg" />
      </Skeletons.Flex>
    </S.Wrapper>
  )
}

export default memo(CardSkeleton)
