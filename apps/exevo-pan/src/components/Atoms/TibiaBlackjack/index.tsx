/* eslint-disable react/jsx-no-target-blank */
import { links } from 'Constants'

const TibiaBlackjack = () => (
  <a
    className="card clickable bg-black/40 p-1 transition-all hover:bg-black/30"
    target="_blank"
    rel="noopener external nofollow"
    href={links.TIBIA_BLACKJACK}
  >
    <img
      className="self-start"
      src="https://i.imgur.com/6pr5S4T.png"
      alt="Tibia Blackjack"
    />
  </a>
)

export default TibiaBlackjack
