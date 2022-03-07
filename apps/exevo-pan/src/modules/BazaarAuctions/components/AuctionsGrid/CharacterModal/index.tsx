import { useMemo, useRef, useCallback } from 'react'
import { Tabs } from 'components/Atoms'
import {
  InfoGrid,
  Checkbox,
  TibiaCoinIcon,
} from 'components/CharacterCard/styles'
import {
  Head,
  Textbox,
  CharacterItems,
  CharacterSkills,
  ImbuementsTooltip,
  CharmsTooltip,
  QuestsTooltip,
  Achievements,
  Hirelings,
} from 'components/CharacterCard/Parts'
import { formatNumberWithCommas, calculateTotalInvestment } from 'utils'
import SpriteBox from './SpriteBox'
import { checkStore, tabCounter } from './utils'
import { resolvers } from './resolvers'
import * as S from './styles'
import { CharacterModalProps } from './types'

const CharacterModal = ({
  open,
  characterData,
  onClose,
}: CharacterModalProps): JSX.Element | null => {
  if (!open || !characterData) return null

  const {
    id,
    sex,
    outfitId,
    nickname,
    level,
    vocationId,
    serverData,
    transfer,
    auctionEnd,
    hasBeenBidded,
    currentBid,
    items,
    skills,
    hirelings,
    charmInfo,
    preySlot,
    huntingSlot,
    storeItems,
    imbuements,
    charms,
    quests,
    outfits,
    mounts,
    storeOutfits,
    storeMounts,
    achievementPoints,
  } = characterData

  const checkboxRecords = useMemo(() => checkStore(storeItems), [])

  const tcInvested = useMemo(
    () => formatNumberWithCommas(calculateTotalInvestment(characterData)),
    [characterData],
  )

  const tabRef = useRef<HTMLDivElement>(null)

  const handleTabChange = useCallback(
    () =>
      tabRef.current?.scrollIntoView({
        block: 'start',
      }),
    [],
  )

  return (
    <>
      <S.Wrapper>
        <Head
          id={id}
          outfitId={outfitId}
          nickname={nickname}
          level={level}
          vocationId={vocationId}
          serverName={serverData.serverName}
        />

        <S.Grid>
          <S.DesktopColumn.Left>
            <InfoGrid>
              <Textbox.Server
                serverData={serverData}
                nickname={nickname}
                transfer={transfer}
              />
              <Textbox.Pvp serverData={serverData} />
              <Textbox.AuctionEnd auctionEnd={auctionEnd} />
              <Textbox.AuctionBid
                hasBeenBidded={hasBeenBidded}
                currentBid={currentBid}
              />
            </InfoGrid>

            <CharacterItems items={items} />

            <S.Section>
              <CharacterSkills skills={skills} />
            </S.Section>

            <S.TooltipSection>
              <ImbuementsTooltip placement="top-start" items={imbuements} />
              <CharmsTooltip
                placement="top-start"
                items={charms}
                charmInfo={charmInfo}
              />
              <QuestsTooltip placement="top-start" items={quests} />
              <Hirelings hirelingsInfo={hirelings} />
              <Achievements achievementPoints={achievementPoints} />
            </S.TooltipSection>
          </S.DesktopColumn.Left>

          <S.DesktopColumn.Right>
            <S.Section>
              <S.SectionText>
                <TibiaCoinIcon /> Total invested:{' '}
                <S.CoinsValue data-active={tcInvested !== '0'}>
                  {tcInvested} Tibia Coins
                </S.CoinsValue>
              </S.SectionText>

              <S.CheckboxWrapper>
                <Checkbox
                  label="Training Dummy"
                  checked={checkboxRecords.dummy}
                />
                <Checkbox
                  label="Gold pouch"
                  checked={checkboxRecords.goldPouch}
                />
                <Checkbox label="Hirelings" checked={hirelings.count > 0} />
                <Checkbox
                  label="Charm expansion"
                  checked={charmInfo.expansion}
                />
                <Checkbox label="Prey Slot" checked={preySlot} />
                <Checkbox label="Hunting Task Slot" checked={huntingSlot} />
                <Checkbox
                  label="Imbuement Shrine"
                  checked={checkboxRecords.imbuementShrine}
                />
                <Checkbox
                  label="Reward Shrine"
                  checked={checkboxRecords.rewardShrine}
                />
                <Checkbox label="Mailbox" checked={checkboxRecords.mailbox} />
              </S.CheckboxWrapper>
            </S.Section>

            <S.TabGroup onChange={handleTabChange} ref={tabRef}>
              <Tabs.Panel
                label={`👚 Outfits ${tabCounter(
                  outfits.length,
                  storeOutfits.length,
                )}`}
              >
                <S.SpriteSection>
                  {outfits.map(({ name, type }) => (
                    <SpriteBox
                      key={name}
                      offset
                      name={name}
                      sex={sex}
                      src={resolvers.outfit(name, sex, type)}
                      type={type}
                      checkRareOutfit
                    />
                  ))}
                </S.SpriteSection>

                {storeOutfits.length > 0 && (
                  <>
                    <S.SpriteSectionDivisor>
                      Store outfits ({storeOutfits.length})
                    </S.SpriteSectionDivisor>
                    <S.SpriteSection>
                      {storeOutfits.map(({ name, type }) => (
                        <SpriteBox
                          key={name}
                          offset
                          name={name}
                          sex={sex}
                          src={resolvers.storeOutfit(name, sex, type)}
                        />
                      ))}
                    </S.SpriteSection>
                  </>
                )}
              </Tabs.Panel>

              <Tabs.Panel
                label={`🐎 Mounts ${tabCounter(
                  mounts.length,
                  storeMounts.length,
                )}`}
              >
                <S.SpriteSection>
                  {mounts.map((name) => (
                    <SpriteBox
                      key={name}
                      offset
                      name={name}
                      sex={sex}
                      src={resolvers.mount(name)}
                      checkRareMount
                    />
                  ))}
                </S.SpriteSection>

                {storeMounts.length > 0 && (
                  <>
                    <S.SpriteSectionDivisor>
                      Store mounts ({storeMounts.length})
                    </S.SpriteSectionDivisor>
                    <S.SpriteSection>
                      {storeMounts.map((name) => (
                        <SpriteBox
                          key={name}
                          offset
                          name={name}
                          sex={sex}
                          src={resolvers.storeMount(name)}
                        />
                      ))}
                    </S.SpriteSection>
                  </>
                )}
              </Tabs.Panel>

              <Tabs.Panel label={`📥 Store Items (${storeItems.length})`}>
                <S.SpriteSection>
                  {storeItems.map(({ name, amount }) => (
                    <SpriteBox
                      key={name}
                      name={name}
                      amount={amount}
                      sex={sex}
                      src={resolvers.storeItem(name)}
                    />
                  ))}
                </S.SpriteSection>
              </Tabs.Panel>
            </S.TabGroup>
          </S.DesktopColumn.Right>
        </S.Grid>
      </S.Wrapper>
      <S.Backdrop onClick={onClose} />
    </>
  )
}

export default CharacterModal
