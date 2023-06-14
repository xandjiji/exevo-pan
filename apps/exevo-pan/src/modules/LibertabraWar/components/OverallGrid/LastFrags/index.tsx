import { useTranslations } from 'contexts/useTranslation'
import { useState, useMemo, useRef, useEffect } from 'react'
import { Table } from 'components/Atoms'
import { useOnScreen } from 'hooks'
import CharacterInfoColumn from '../../CharacterInfoColumn'
import { getTimeDiff } from './utils'
import { LastFragsProps } from './types'

const PAGE_SIZE = 20

const LastFrags = ({ fragsList, ...props }: LastFragsProps) => {
  const { war } = useTranslations()

  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.ceil(fragsList.length / PAGE_SIZE) - 1
  const reachedMaxPage = currentIndex >= maxIndex

  const currentList = useMemo(
    () => fragsList.slice(0, (currentIndex + 1) * PAGE_SIZE),
    [currentIndex],
  )

  const ref = useRef<HTMLDivElement>()
  const onScreen = useOnScreen<HTMLDivElement>(ref)
  useEffect(() => {
    if (onScreen) setCurrentIndex((prevIndex) => prevIndex + 1)
  }, [onScreen])

  return (
    <div className="relative">
      <Table {...props}>
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn className="w-20 text-left">
                {war.OverallGrid.LastFrags.killedHeadColumn}
              </Table.HeadColumn>
              <Table.HeadColumn
                highlighted
                desc
                title={war.OverallGrid.LastFrags.characterHeadColumnTitle}
                className="px-4 text-left"
              >
                Character
              </Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {currentList.map((frag) => (
              <Table.Row key={`${frag.timeStamp}-${frag.nickname}`}>
                <Table.Column className="w-20 text-left align-top text-xs leading-relaxed">{`${getTimeDiff(
                  frag.timeStamp,
                )} ${war.OverallGrid.LastFrags.timeDiffSuffix}`}</Table.Column>
                <CharacterInfoColumn
                  nickname={frag.nickname}
                  level={frag.level}
                  vocation={frag.vocation}
                  className="px-4 text-left"
                />
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Element>
      </Table>
      {!reachedMaxPage && (
        <div
          className="z-1 absolute bottom-[440px] left-0"
          ref={ref as React.RefObject<HTMLDivElement>}
        />
      )}
    </div>
  )
}

export default LastFrags
