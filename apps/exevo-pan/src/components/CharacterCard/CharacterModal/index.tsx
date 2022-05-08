import { useMemo, useRef, useCallback } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { Dialog, Tabs } from 'components/Atoms'
import { InfoGrid, Checkbox, Icons } from 'components/CharacterCard/atoms'
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
import { useIsDesktop } from 'hooks'
import { formatNumberWithCommas, calculateTotalInvestment } from 'utils'
import OutfitIcon from 'assets/svgs/outfit.svg'
import MountIcon from 'assets/svgs/horse.svg'
import StoreIcon from 'assets/svgs/inbox.svg'
import SpriteBox from './SpriteBox'
import { checkStore, tabCounter } from './utils'
import { resolvers } from './resolvers'
import * as S from './atoms'
import styles from './styles.module.css'
import { CharacterModalProps } from './types'

/*
--lateralMargin: 14px;
--cardFixedHeight: 450px;
--cardMaxMobileWidth: 368px;
--gridMobileHeight: 60vh;
--scrollbarWidth: 6px;
*/

const CharacterModal = ({
  characterData,
  onClose,
  past = false,
}: CharacterModalProps) => {
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

  const {
    translations: { common },
  } = useTranslations()

  const checkboxRecords = useMemo(() => checkStore(storeItems), [])

  const tcInvested = useMemo(
    () => formatNumberWithCommas(calculateTotalInvestment(characterData)),
    [characterData],
  )

  const tabRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()

  const handleTabChange = useCallback(() => {
    if (!isDesktop) {
      tabRef.current?.scrollIntoView({
        block: 'start',
      })
    }
  }, [isDesktop])

  return (
    <Dialog
      isOpen
      onClose={onClose}
      className={clsx(
        styles.wrapper,
        'w-full max-w-[var(--cardMaxMobileWidth)] p-[var(--lateralMargin)] outline-none md:w-fit md:max-w-[calc(100%-80px)]',
      )}
    >
      <Head
        id={id}
        outfitId={outfitId}
        nickname={nickname}
        level={level}
        vocationId={vocationId}
        serverName={serverData.serverName}
      />

      <div className="custom-scrollbar -mx-[var(--lateralMargin)] h-[var(--gridMobileHeight)] overflow-y-auto px-[var(--lateralMargin)] md:h-[var(--cardFixedHeight)]">
        <S.Spacer className="w-full md:flex md:gap-6">
          <S.Spacer className="md:z-4 h-fit pt-[6px] md:sticky md:top-0 md:min-w-[280px] md:max-w-fit md:shrink-0">
            <InfoGrid>
              <Textbox.Server
                serverData={serverData}
                nickname={nickname}
                transfer={transfer}
                placement="bottom"
              />
              <Textbox.Pvp serverData={serverData} />
              <Textbox.AuctionEnd auctionEnd={auctionEnd} past={past} />
              <Textbox.AuctionBid
                hasBeenBidded={hasBeenBidded}
                currentBid={currentBid}
                past={past}
              />
            </InfoGrid>

            <CharacterItems items={items} />

            <S.Section border>
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
          </S.Spacer>

          <S.Spacer className="h-fit w-full">
            <S.Section border className="z-3">
              <div
                title={`${common.CharacterCard.tcInvested.prefix} ${tcInvested} ${common.CharacterCard.tcInvested.suffix}`}
                className="text-tsm flex items-center gap-[5px]"
              >
                <Icons.TibiaCoin />{' '}
                {common.CharacterCard.CharacterModal.totalInvested}:{' '}
                <strong
                  className={clsx(
                    tcInvested === '0'
                      ? 'font-normal'
                      : 'text-primaryHighlight',
                  )}
                >
                  {tcInvested} Tibia Coins
                </strong>
              </div>

              <div className="grid grid-flow-col grid-rows-3 gap-2 md:max-w-[400px]">
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
              </div>
            </S.Section>

            <Tabs.Group
              className="min-h-[var(--gridMobileHeight)] md:min-h-[unset]"
              style={{ display: 'block', overflow: 'unset' }}
              onChange={handleTabChange}
              ref={tabRef}
            >
              <Tabs.Panel
                label={
                  <>
                    <OutfitIcon />
                    Outfits {tabCounter(outfits.length, storeOutfits.length)}
                  </>
                }
              >
                <S.SpriteSection>
                  {outfits.map(({ name, type }) => (
                    <SpriteBox
                      key={name}
                      offset
                      auctionId={id}
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
                          auctionId={id}
                          name={name}
                          sex={sex}
                          src={resolvers.storeOutfit(name, sex, type)}
                        />
                      ))}
                    </S.SpriteSection>
                  </>
                )}
              </Tabs.Panel>

              {mounts.length + storeMounts.length > 0 && (
                <Tabs.Panel
                  label={
                    <>
                      <MountIcon />
                      Mounts {tabCounter(mounts.length, storeMounts.length)}
                    </>
                  }
                >
                  <S.SpriteSection>
                    {mounts.map((name) => (
                      <SpriteBox
                        key={name}
                        offset
                        auctionId={id}
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
                            auctionId={id}
                            name={name}
                            sex={sex}
                            src={resolvers.storeMount(name)}
                          />
                        ))}
                      </S.SpriteSection>
                    </>
                  )}
                </Tabs.Panel>
              )}

              {storeItems.length > 0 && (
                <Tabs.Panel
                  label={
                    <>
                      <StoreIcon />
                      Store Items ({storeItems.length})
                    </>
                  }
                >
                  <S.SpriteSection>
                    {storeItems.map(({ name, amount }, childIndex) => (
                      <SpriteBox
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${childIndex}-${name}`}
                        auctionId={id}
                        name={name}
                        amount={amount}
                        sex={sex}
                        src={resolvers.storeItem(name)}
                      />
                    ))}
                  </S.SpriteSection>
                </Tabs.Panel>
              )}
            </Tabs.Group>
          </S.Spacer>
        </S.Spacer>
      </div>
    </Dialog>
  )
}

export default CharacterModal
