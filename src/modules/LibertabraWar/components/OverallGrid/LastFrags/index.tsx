import { useState, useMemo, useRef, useEffect } from 'react'
import { Table } from 'components/Atoms'
import { useOnScreen } from 'hooks'
import CharacterInfoColumn from '../../CharacterInfoColumn'
import { getTimeDiff } from './utils'
import * as S from './styles'
import { LastFragsProps } from './types'

const PAGE_SIZE = 20

const LastFrags = ({ fragsList, ...props }: LastFragsProps): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.ceil(fragsList.length / PAGE_SIZE) - 1
  const reachedMaxPage = currentIndex >= maxIndex

  const currentList = useMemo(
    () => fragsList.slice(0, (currentIndex + 1) * PAGE_SIZE),
    [currentIndex],
  )

  const ref = useRef<HTMLDivElement | null>()
  const onScreen = useOnScreen<HTMLDivElement>(ref)
  useEffect(() => {
    if (onScreen) setCurrentIndex((prevIndex) => prevIndex + 1)
  }, [onScreen])

  return (
    <S.Wrapper>
      <S.Table {...props}>
        <Table.Head>
          <Table.Row>
            <Table.HeadColumn>Killed</Table.HeadColumn>
            <Table.HeadColumn highlighted title="Sorted by character level">
              Character
            </Table.HeadColumn>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {currentList.map((frag) => (
            <Table.Row key={`${frag.timeStamp}-${frag.nickname}`}>
              <Table.Column>{getTimeDiff(frag.timeStamp)}</Table.Column>
              <CharacterInfoColumn
                nickname={frag.nickname}
                level={frag.level}
                vocation={frag.vocation}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </S.Table>
      {!reachedMaxPage && (
        <S.ObserverElement ref={ref as React.RefObject<HTMLDivElement>} />
      )}
    </S.Wrapper>
  )
}

export default LastFrags
