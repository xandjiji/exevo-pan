import { useTheme } from 'contexts/useTheme'
import MiniAuction from './MiniAuction'

const MiniAuctionGrid = () => {
  const { theme } = useTheme()

  return (
    <div
      className="grid w-fit grid-cols-3 gap-4"
      style={{ transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)' }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
        <MiniAuction
          key={key}
          variant={theme === 'light' ? 'light' : 'dark'}
          style={{ zIndex: key % 3 === 0 ? 1 : key % 3 === 1 ? 3 : 2 }}
        />
      ))}
    </div>
  )
}

export default MiniAuctionGrid
