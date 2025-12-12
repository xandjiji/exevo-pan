import { useCallback, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Dialog, Tabs } from 'components/Atoms'
import { Checkbox, Icons, InfoGrid } from 'components/CharacterCard/atoms'
import {
  Achievements,
  BossPoints,
  CharacterItems,
  CharacterSkills,
  CharmsTooltip,
  GemsTooltip,
  Head,
  Hirelings,
  ImbuementsTooltip,
  QuestsTooltip,
  Textbox,
} from 'components/CharacterCard/Parts'
import { useIsDesktop } from 'hooks'
import { formatNumberWithCommas, getTCState } from 'utils'
import { routes } from 'Constants'
import { HorseIcon, InboxIcon, OutfitIcon } from 'assets/svgs'
import { useLocalizedHref } from 'hooks/useLocalizedHref'
import SpriteBox from './SpriteBox'
import { auctionHasEnded, checkStore, tabCounter } from './utils'
import { resolvers } from './resolvers'
import * as S from './atoms'
import styles from './styles.module.css'
import { CharacterModalProps } from './types'

/*
--lateralMargin: 14px;
--cardFixedHeight: 490px;
--cardMaxMobileWidth: 368px;
--gridMobileHeight: 60vh;
--scrollbarWidth: 6px;
*/

const CharacterModal = ({
  characterData,
  onClose,
  permalink,
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
    quests,
    outfits,
    mounts,
    storeOutfits,
    storeMounts,
    achievementPoints,
    bossPoints,
    gems,
    greaterGems,
  } = characterData

  const { common } = useTranslations()

  const [past] = useState(auctionHasEnded(characterData))

  const checkboxRecords = useMemo(() => checkStore(storeItems), [])

  const tcInvested = formatNumberWithCommas(characterData.tcInvested)
  const tcState = getTCState(characterData.tcInvested)

  const tabRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()

  const handleTabChange = useCallback(() => {
    if (!isDesktop) {
      tabRef.current?.scrollIntoView({
        block: 'start',
      })
    }
  }, [isDesktop])

  const localizedExevoProHref = useLocalizedHref(routes.EXEVOPRO)

  return (
    <Dialog
      isOpen
      onClose={onClose}
      className={clsx(
        styles.wrapper,
        'w-full max-w-[var(--cardMaxMobileWidth)] !p-[var(--lateralMargin)] outline-none md:w-fit md:max-w-[calc(100%-80px)]',
      )}
    >
      <Head
        id={id}
        outfitId={outfitId}
        nickname={nickname}
        level={level}
        vocationId={vocationId}
        serverName={serverData.serverName}
        permalink={permalink}
      />

      <div className="custom-scrollbar -mx-[var(--lateralMargin)] h-[var(--gridMobileHeight)] overflow-y-auto px-[var(--lateralMargin)] md:h-[var(--cardFixedHeight)]">
        <S.Spacer className="w-full md:flex md:gap-6">
          <S.Spacer className="md:z-4 h-fit pt-1.5 md:sticky md:top-0 md:min-w-[280px] md:max-w-fit md:shrink-0">
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
              <CharacterSkills skills={skills} style={{ marginBottom: 0 }} />
            </S.Section>

            <S.TooltipSection>
              <ImbuementsTooltip placement="top-start" items={imbuements} />
              <CharmsTooltip charmPoints={charmInfo.total} />
              <QuestsTooltip placement="top-start" items={quests} />
              <GemsTooltip
                placement="top-start"
                gems={gems}
                greaterGems={greaterGems}
              />
              <BossPoints bossPoints={bossPoints} />
              <Hirelings hirelingsInfo={hirelings} />
              <Achievements achievementPoints={achievementPoints} />
            </S.TooltipSection>
          </S.Spacer>

          <S.Spacer className="h-fit w-full">
            <S.Section border className="z-3">
              {tcState === 'HIDDEN' ? (
                <a
                  href={localizedExevoProHref}
                  className="text-onSurface text-tsm flex items-center gap-1.5"
                >
                  <Icons.TibiaCoin />{' '}
                  <strong className="text-rare">
                    ??? {common.CharacterCard.tcInvested.invested}{' '}
                  </strong>
                  <small className="font-light tracking-wider">
                    {templateMessage(
                      common.CharacterCard.CharacterModal.exclusive,
                      {
                        exevopro: (
                          <strong className="rare-gradient-text text-rare whitespace-nowrap">
                            Exevo Pro <span className="text-onSurface">🚀</span>
                          </strong>
                        ),
                      },
                    )}
                  </small>
                </a>
              ) : (
                <div
                  title={`${common.CharacterCard.tcInvested.prefix} ${tcInvested} ${common.CharacterCard.tcInvested.suffix}`}
                  className="text-tsm flex items-center gap-[5px]"
                >
                  <Icons.TibiaCoin />{' '}
                  {common.CharacterCard.CharacterModal.totalInvested}:{' '}
                  <strong
                    className={clsx(
                      tcInvested === '0' ? 'font-normal' : 'text-rare',
                    )}
                  >
                    {tcInvested} Tibia Coins
                  </strong>
                </div>
              )}

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
                <Checkbox label="Weekly Task Expansion" checked={huntingSlot} />
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
              className="bg-surface min-h-[var(--gridMobileHeight)] overflow-hidden md:min-h-[unset]"
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

              {mounts.length + storeMounts.length > 0 ? (
                <Tabs.Panel
                  label={
                    <>
                      <HorseIcon />
                      Mounts {tabCounter(mounts.length, storeMounts.length)}
                    </>
                  }
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
              ) : (
                <></>
              )}

              {storeItems.length > 0 ? (
                <Tabs.Panel
                  label={
                    <>
                      <InboxIcon />
                      Store Items ({storeItems.length})
                    </>
                  }
                >
                  <S.SpriteSection>
                    {storeItems.map(({ name, amount }, childIndex) => (
                      <SpriteBox
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${childIndex}-${name}`}
                        name={name}
                        amount={amount}
                        sex={sex}
                        src={resolvers.storeItem(name)}
                      />
                    ))}
                  </S.SpriteSection>
                </Tabs.Panel>
              ) : (
                <></>
              )}
            </Tabs.Group>
          </S.Spacer>
        </S.Spacer>
      </div>
    </Dialog>
  )
}

export default CharacterModal
