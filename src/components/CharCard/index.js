import React from 'react';
import CharCard from './CharCard.styled';
import ImagePortrait from '../ImagePortrait';
import LabeledText from '../LabeledText';
import AuctionTimer from '../AuctionTimer';
import SkillBar from '../SkillBar';

import ExternalIcon from '../../assets/svgs/external.svg';
import BrFlag from '../../assets/br-flag.png';
import EuFlag from '../../assets/eu-flag.png';
import NaFlag from '../../assets/na-flag.png';
import TibiaCoinIcon from '../../assets/tibiacoin.png';

export default ({ charData }) => {
    const {
        nickname,
        outfitId,
        href,
        currentBid,
        hasBeenBidded,
        auctionEnd,
        level,
        vocation,
        server,
        skills
    } = charData;
    const endDate = new Date(auctionEnd * 1000);

    return (
        <CharCard className="shadow">
            <div className="card-head">
                <ImagePortrait
                    src={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}`}
                    alt={nickname}
                    title={nickname}
                />
                <div className="head-info">
                    <p className="nickname">
                        {nickname}
                        <a href={href} target="_blank" rel="noreferrer">
                            <ExternalIcon className="clickable" />
                        </a>
                    </p>
                    <div className="level-vocation">
                        Level {level} - {vocation}
                    </div>
                </div>
            </div>

            <div className="overview">

                <LabeledText label="Server" warning={server.experimental} warningText="This is an experimental server!">
                    <div className="overview-content row">
                        <img
                            className="flag"
                            alt={server.serverLocation.string}
                            title={server.serverLocation.string}
                            src={getFlag(server.serverLocation.type)}
                        />
                        {server.serverName}
                    </div>
                </LabeledText>

                <LabeledText label="PvP">
                    <div className="overview-content row">
                        <span
                            className="battleye"
                            style={{ backgroundColor: `${server.battleye ? 'var(--battleGreen)' : 'var(--battleYellow)'}` }}
                        >
                        </span>
                        {server.pvpType.string}
                    </div>
                </LabeledText>

                <LabeledText label="Auction End">
                    <div className="overview-content">
                        <AuctionTimer endDate={endDate} />
                    </div>
                </LabeledText>

                <LabeledText label={hasBeenBidded ? 'Current Bid' : 'Minimum Bid'}>
                    <div className="overview-content row bid">
                        <img
                            className="coin"
                            alt="Tibia Coin"
                            src={TibiaCoinIcon}
                        />
                        {numberWithCommas(currentBid)}
                    </div>
                </LabeledText>
            </div>

            <div className="card-footer">
                <div className="skills-wrapper">
                    {Object.keys(skills).map(skillItem => <SkillBar key={skillItem} skillName={skillItem} skill={skills[skillItem]} />)}
                </div>

                <div className="charms-wrapper">

                </div>
            </div>
        </CharCard>
    )
}

const getFlag = (type) => {
    switch (type) {
        case 0:
            return EuFlag;

        case 1:
            return NaFlag;

        case 2:
            return BrFlag;

        default:
            return BrFlag;
    }
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}