import clsx from 'clsx'
import styles from './styles.module.css'

const distributionData = {
  dummy: '51,6%',
  goldPouch: '33,1%',
  imbuementShrine: '25,4%',
  rewardShrine: '47%',
  mailbox: '10,3%',
  charmExpansion: '51,2%',
  preySlot: '67,1%',
  hirelings: '49,6%',
  huntingSlot: '6,6%',
}

const Percentage = (args: JSX.IntrinsicElements['span']) => (
  <span
    {...args}
    className="bg-primary text-tsm text-onPrimary inline-block min-w-[44px] rounded-md py-0.5 px-1 text-right font-bold tracking-wide"
  />
)

const Li = (args: JSX.IntrinsicElements['li']) => (
  <li {...args} className="text-tsm whitespace-nowrap" />
)

const StoreItemDistribution = () => (
  <ul className={clsx('mx-auto grid min-w-fit gap-y-2 gap-x-3', styles.list)}>
    <Li>
      <Percentage>{distributionData.dummy}</Percentage> Training Dummy
    </Li>
    <Li>
      <Percentage>{distributionData.goldPouch}</Percentage> Gold pouch
    </Li>
    <Li>
      <Percentage>{distributionData.hirelings}</Percentage> Hirelings
    </Li>
    <Li>
      <Percentage>{distributionData.charmExpansion}</Percentage> Charm expansion
    </Li>
    <Li>
      <Percentage>{distributionData.preySlot}</Percentage> Prey Slot
    </Li>
    <Li>
      <Percentage>{distributionData.huntingSlot}</Percentage> Hunting Task Slot
    </Li>
    <Li>
      <Percentage>{distributionData.imbuementShrine}</Percentage> Imbuement
      Shrine
    </Li>
    <Li>
      <Percentage>{distributionData.rewardShrine}</Percentage> Reward Shrine
    </Li>
    <Li>
      <Percentage>{distributionData.mailbox}</Percentage> Mailbox
    </Li>
  </ul>
)

export default StoreItemDistribution
