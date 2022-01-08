import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import * as S from '../styles'
import * as Skeletons from './styles'

const CardSkeleton = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <S.Wrapper highlighted={false} {...props}>
      <S.Head>
        <Skeletons.Square />
        <S.HeadInfo>
          <Skeletons.Text style={{ width: '50%' }} />
          <Skeletons.Text style={{ width: '75%', height: 8 }} />
        </S.HeadInfo>
      </S.Head>

      <S.InfoGrid>
        <S.LabeledTextBox labelText="Server">
          <Skeletons.Flex>
            <Skeletons.Flag />
            <Skeletons.Text style={{ width: '35%' }} />
            <Skeletons.Circle style={{ marginLeft: 'auto' }} />
          </Skeletons.Flex>
        </S.LabeledTextBox>
        <S.LabeledTextBox labelText="PvP">
          <Skeletons.Flex>
            <Skeletons.Circle
              style={{ width: 12, height: 12, marginRight: 4 }}
            />
            <Skeletons.Text style={{ width: '70%' }} />
          </Skeletons.Flex>
        </S.LabeledTextBox>
        <S.LabeledTextBox labelText={common.CharacterCard.AuctionStatus}>
          <Skeletons.Text style={{ width: '65%' }} />
        </S.LabeledTextBox>

        <S.LabeledTextBox labelText={common.CharacterCard.BidStatus}>
          <Skeletons.Flex>
            <Skeletons.Circle
              style={{ width: 12, height: 12, marginRight: 4 }}
            />
            <Skeletons.Text style={{ width: '50%' }} />
          </Skeletons.Flex>
        </S.LabeledTextBox>
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

      <S.Footer>
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

        <Skeletons.Flex>
          <Skeletons.Charm style={{ width: 94 }} />
          <Skeletons.Charm style={{ width: 54 }} />
          <Skeletons.Charm />
        </Skeletons.Flex>
      </S.Footer>
    </S.Wrapper>
  )
}

export default memo(CardSkeleton)
