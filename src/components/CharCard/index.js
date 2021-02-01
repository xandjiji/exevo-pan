import React, { useEffect, useState } from 'react';
import CharCard from './CharCard.styled';
import ImagePortrait from '../ImagePortrait';
import LabeledText from '../LabeledText';
import AuctionTimer from '../AuctionTimer';
import SkillBar from '../SkillBar';
import Tag from '../Tag';

import { ReactComponent as ExternalIcon } from '../../assets/svgs/external.svg';
import BrFlag from '../../assets/br-flag.png';
import EuFlag from '../../assets/eu-flag.png';
import NaFlag from '../../assets/na-flag.png';
import TibiaCoinIcon from '../../assets/tibiacoin.png';

export default ({ charData }) => {
    const {
        id,
        nickname,
        outfitId,
        currentBid,
        hasBeenBidded,
        auctionEnd,
        level,
        vocation,
        server,
        skills,
        items,
        charms
    } = charData;
    const endDate = new Date(auctionEnd * 1000);

    const [highlightedSkill, setHighlightedSkill] = useState(null);

    useEffect(() => {
        let biggest = 'magic';
        for (const key in skills) {
            if (skills[key].level > skills[biggest].level) {
                biggest = key;
            }
        }

        setHighlightedSkill(biggest);
    }, [skills]);

    return (
        <CharCard className="shadow">
            <div className="card-head">
                <ImagePortrait
                    src={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
                    alt={nickname}
                    title={nickname}
                />
                <div className="head-info">
                    <p className="nickname">
                        {nickname}
                        <a href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${id}&source=overview`} target="_blank" rel="noreferrer">
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
                    <div className="overview-content auction">
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

                <div className="item-wrapper">
                    {items.map(makeItemImg)}
                </div>
            </div>

            <div className="card-footer">
                <div className="skills-wrapper">
                    {Object.keys(skills).map(skillItem =>
                        <SkillBar
                            key={skillItem}
                            skillName={skillItem}
                            skill={skills[skillItem]}
                            highlight={skillItem === highlightedSkill}
                        />)
                    }
                </div>

                {charms.length > 0
                    ? <div className="charms-wrapper">
                        {charms.map(charm => <Tag key={charm}>{charm}</Tag>)}
                    </div>
                    : null
                }
            </div>
        </CharCard>
    )
}

const makeItemImg = (item) => {
    if (item !== null) {
        return (
            <ImagePortrait
                src={`https://static.tibia.com/images/charactertrade/objects/${item.src}.gif`}
                alt={item.name}
                title={item.name}
            />
        )
    } else {
        return (
            <ImagePortrait />
        )
    }
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