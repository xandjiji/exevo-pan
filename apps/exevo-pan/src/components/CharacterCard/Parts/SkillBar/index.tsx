import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Dialog } from 'components/Atoms'
import { SkillBarProps } from './types'
import { getDecimalPart } from './utils'

const SkillBar = ({
  skillName,
  skillValue,
  highlight = false,
  expandable = false,
  className,
  ...props
}: SkillBarProps) => {
  const [openDialog, setOpenDialog] = useState(false)

  const [progressPercentage, setProgressPercentage] = useState<string>('0%')
  useEffect(() => {
    const dispatchedAnimation = setTimeout(
      () => setProgressPercentage(`${getDecimalPart(skillValue)}%`),
      0,
    )
    return () => clearTimeout(dispatchedAnimation)
  }, [skillValue])

  return (
    <button
      title={progressPercentage}
      type="button"
      className={clsx(
        'flex items-end',
        expandable ? 'cursor-pointer' : 'pointer-events-none',
        className,
      )}
      onClick={() => setOpenDialog(true)}
      disabled={!expandable}
      {...props}
    >
      <div
        className={clsx(
          'text-s text-onPrimary mr-1.5 w-8 flex-none rounded p-[3px] text-right font-bold tracking-wider transition-colors',
          highlight ? 'bg-green' : 'bg-primary',
          expandable && 'underline decoration-dashed underline-offset-1',
        )}
      >
        {Math.floor(skillValue)}
      </div>
      <div className="bg-primaryVariant relative mt-[1px] h-1 w-full shadow-sm">
        <span
          className="text-tsm text-onSurface absolute left-0 font-light capitalize"
          style={{ bottom: 'calc(100% + 1px)' }}
        >
          {skillName}
        </span>

        <div
          className={clsx('h-full', highlight ? 'bg-green' : 'bg-primary')}
          style={{
            width: progressPercentage,
            transition: 'width 0.4s ease-out',
          }}
        />
      </div>
      <Dialog isOpen={openDialog} onClose={() => setOpenDialog(false)} />
    </button>
  )
}

export default SkillBar
