import styled from 'styled-components'

const Wrapper = styled.article`
  display: none;
`

const Content = (): JSX.Element => (
  <Wrapper>
    <section>
      <h2>The official Tibia Char Bazaar</h2>
      <p>
        For a long time (over 13 years!) buying or selling accounts was
        prohibited by{' '}
        <a
          href="https://www.cipsoft.com"
          target="_blank"
          rel="noopener noreferrer external"
        >
          CipSoft
        </a>
        . Still, players used to <strong>trade accounts</strong> on black
        markets, unsupported by the game&apos;s official rules. Though it was an
        illegal activity, players were very rarely punished.
      </p>
      <p>
        In August 13, 2020,{' '}
        <a
          href="https://www.cipsoft.com"
          target="_blank"
          rel="noopener noreferrer external"
        >
          CipSoft
        </a>{' '}
        decided to support <strong>selling and buying characters</strong>,
        through the <strong>official Tibia Char Bazaar</strong>, using{' '}
        <strong>Tibia Coins</strong>. Not that account trading is still illegal
        and you may be punished by getting all accounts involved deleted.
        Because of that, we encourage that you use only the official Char Bazaar
        to buy or sell characters. By doing so, you will also be 100% safe from
        being hacked and/or scammed. Once a winning bid is set, the exchange
        will happen automatically and Cipsoft will act as the intermediator,
        meaning that both parties of the transaction will not need to get in
        contact or trust each other.
      </p>
    </section>

    <section>
      <h2>Tips and tricks for buying a character</h2>
      <p>
        You should focus in finding a character with the best following
        features: <strong>skills</strong>, <strong>charms</strong>,{' '}
        <strong>runes</strong> and <strong>imbuements</strong>. Everything else
        is not should not be your priority: <strong>level</strong>,{' '}
        <strong>items</strong>, and <strong>quests</strong>. You can use{' '}
        <a
          href="https://www.exevopan.com"
          target="_top"
          rel="noopener noreferrer"
        >
          Exevo Pan
        </a>{' '}
        to <strong>filter</strong> through all auctions and find the highest
        value characters. Also, you can explore the{' '}
        <a
          href="https://www.exevopan.com/bazaar-history"
          target="_top"
          rel="noopener noreferrer"
        >
          Char Bazaar history
        </a>{' '}
        to compare previous character prices.
      </p>
      <p>
        If you find a character with high value but that is not on your desired
        game world, you should consider buying an transfering it. You can check
        first if the character has <strong>server transfer availability</strong>{' '}
        (either regular or express) to calculate the cost beforehand. Often
        times it is worth to pay a world transfer for a high value character,
        since skills, runes and charms may take years to acquire.
      </p>
      <p>
        You should avoid buing <strong>rare items</strong> on the Tibia Char
        Bazaar, since you can buy them on the in-game market without paying any
        Tibia Coins fee in the process.
      </p>
    </section>

    <section>
      <h2>Tips and tricks for selling a character</h2>
      <p>
        Try to highlight the characters most valuable assets:{' '}
        <strong>skills</strong>, <strong>charms</strong>, <strong>runes</strong>{' '}
        and <strong>imbuements</strong>. If you have any{' '}
        <strong>rare items</strong>, <strong>rare outfits</strong> or{' '}
        <strong>rare achievements</strong>, display it on the auction
        highlights.
      </p>
      <p>
        Another important tip is to set the auction end time whenever there is a
        high population players online. Since bids get more frequent on the last
        auction minutes, you want more players available to bid on your auction
        at that time. This will prevent your auction from finishing unnoticed
        and ending with a low bid.
      </p>
      <p>
        Avoid selling your rare items on the Char Bazaar, since you can sell
        them on the in-game market without paying any fees. You can later buy
        Tibia Coins with your gold and having the same effect as if you were
        selling your items on the Char Bazaar.
      </p>
    </section>

    <section>
      <h2>Typical mistakes and pitfalls on using the Char Bazaar</h2>
      <ul>
        <li>Selling rare items</li>
        <li>
          Setting long periods between the auction start date and end date
        </li>
        <li>Setting the end date at a low online count time</li>
        <li>
          Buying a high level character with low skills and/or no runes or
          charms
        </li>
        <li>Buying a character from experimental servers</li>
        <li>Buying characters with rare items on Rookgaard</li>
        <li>
          Buying a character that is on the dominant guild&apos;s hunted list
        </li>
      </ul>
    </section>
  </Wrapper>
)

export default Content
