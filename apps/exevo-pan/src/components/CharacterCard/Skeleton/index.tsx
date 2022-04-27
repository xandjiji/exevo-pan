import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import * as S from '../atoms'
import * as Skeletons from './atoms'

const CardSkeleton = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <S.Wrapper {...props}>
      <Skeletons.Head>
        <Skeletons.Square />
        <Skeletons.HeadInfo>
          <Skeletons.Text style={{ width: '50%' }} />
          <Skeletons.Text style={{ width: '75%', height: 8 }} />
        </Skeletons.HeadInfo>
      </Skeletons.Head>

      <S.InfoGrid style={{ marginBottom: 12 }}>
        <Skeletons.LabeledTextBox labelText="Server">
          <Skeletons.Flex>
            <Skeletons.Flag />
            <Skeletons.Text style={{ width: '35%' }} />
            <Skeletons.Circle style={{ marginLeft: 'auto' }} />
          </Skeletons.Flex>
        </Skeletons.LabeledTextBox>
        <Skeletons.LabeledTextBox labelText="PvP">
          <Skeletons.Flex>
            <Skeletons.Circle
              style={{ width: 12, height: 12, marginRight: 4 }}
            />
            <Skeletons.Text style={{ width: '70%' }} />
          </Skeletons.Flex>
        </Skeletons.LabeledTextBox>
        <Skeletons.LabeledTextBox
          labelText={common.CharacterCard.AuctionStatus}
        >
          <Skeletons.Text style={{ width: '65%' }} />
        </Skeletons.LabeledTextBox>

        <Skeletons.LabeledTextBox labelText={common.CharacterCard.BidStatus}>
          <Skeletons.Flex>
            <Skeletons.Circle
              style={{ width: 12, height: 12, marginRight: 4 }}
            />
            <Skeletons.Text style={{ width: '50%' }} />
          </Skeletons.Flex>
        </Skeletons.LabeledTextBox>
      </S.InfoGrid>

      <Skeletons.ItemWrapper>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeletons.Square key={index} style={{ width: 48, height: 48 }} />
        ))}
      </Skeletons.ItemWrapper>

      <Skeletons.SkillWrapper>
        {Array.from({ length: 8 }, (_, index) => (
          <Skeletons.SkillItem key={index}>
            <Skeletons.Skillbox />
            <div style={{ width: '100%' }}>
              <Skeletons.Text
                style={{ width: 48, height: 6, marginBottom: 3 }}
              />
              <Skeletons.Text style={{ width: '100%', height: 4 }} />
            </div>
          </Skeletons.SkillItem>
        ))}
      </Skeletons.SkillWrapper>

      <S.FlexFooter style={{ marginBottom: 12 }}>
        <S.FlexColumn>
          <Skeletons.Flex>
            <Skeletons.ImbuementsIcon />
            <Skeletons.Text style={{ width: 126, height: 10 }} />
          </Skeletons.Flex>
          <Skeletons.Flex>
            <Skeletons.ImbuementsIcon />
            <Skeletons.Text style={{ width: 100, height: 10 }} />
          </Skeletons.Flex>
          <Skeletons.Flex>
            <Skeletons.ImbuementsIcon />
            <Skeletons.Text style={{ width: 100, height: 10 }} />
          </Skeletons.Flex>
        </S.FlexColumn>

        <S.FlexColumn>
          <Skeletons.Flex>
            <Skeletons.ImbuementsIcon />
            <Skeletons.Text style={{ width: 110, height: 10 }} />
          </Skeletons.Flex>
          <Skeletons.Flex>
            <Skeletons.ImbuementsIcon />
            <Skeletons.Text style={{ width: 58, height: 10 }} />
          </Skeletons.Flex>
          <Skeletons.Flex>
            <Skeletons.ImbuementsIcon />
            <Skeletons.Text style={{ width: 66, height: 10 }} />
          </Skeletons.Flex>
        </S.FlexColumn>
      </S.FlexFooter>

      <Skeletons.Flex>
        <Skeletons.Charm style={{ width: 94 }} />
        <Skeletons.Charm style={{ width: 54 }} />
        <Skeletons.Charm />
      </Skeletons.Flex>
    </S.Wrapper>
  )
}

export default memo(CardSkeleton)
