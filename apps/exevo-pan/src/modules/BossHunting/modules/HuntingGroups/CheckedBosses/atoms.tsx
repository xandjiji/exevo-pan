export const BossTooltipContent = () => (
  <span className="decoration-primary underline decoration-dashed underline-offset-4">
    bosses
  </span>
)

export const TooltipList = ({ list }: { list: string[] }) => (
  <ul className="marker:text-primaryHighlight grid list-inside list-disc gap-1.5 text-left">
    {list.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)
