import React, { useEffect, useState, useContext } from 'react';
import CharCard from './CharCard.styled';

import { charmDictionary, characterDictionary } from '../../utils/dataDictionary';

import ImagePortrait from '../ImagePortrait';
import LabeledText from '../LabeledText';
import AuctionTimer from '../AuctionTimer';
import SkillBar from '../SkillBar';
import Tag from '../Tag';

import serverDataContext from '../../contexts/ServerData/context';

import { ReactComponent as ExternalIcon } from '../../assets/svgs/external.svg';
import BrFlag from '../../assets/br-flag.png';
import EuFlag from '../../assets/eu-flag.png';
import NaFlag from '../../assets/na-flag.png';
import TibiaCoinIcon from '../../assets/tibiacoin.png';

const vocationEnum = {
    '0': 'None',
    '1': 'Elite Knight',
    '2': 'Royal Paladin',
    '3': 'Master Sorcerer',
    '4': 'Elder Druid',
    '10': 'None',
    '11': 'Knight',
    '12': 'Paladin',
    '13': 'Sorcerer',
    '14': 'Druid'
}

export default ({ charData }) => {
    const serverData = useContext(serverDataContext);

    const id = charData[characterDictionary['id']];
    const nickname = charData[characterDictionary['nickname']];
    const outfitId = charData[characterDictionary['outfitId']];
    const currentBid = charData[characterDictionary['currentBid']];
    const hasBeenBidded = charData[characterDictionary['hasBeenBidded']];
    const auctionEnd = charData[characterDictionary['auctionEnd']];
    const level = charData[characterDictionary['level']];
    const vocationId = charData[characterDictionary['vocationId']];
    const serverId = charData[characterDictionary['serverId']];
    const skills = charData[characterDictionary['skills']];
    const items = charData[characterDictionary['items']];
    const charms = charData[characterDictionary['charms']];

    const currentServer = serverData[serverId];

    const endDate = new Date(auctionEnd * 1000);

    const [highlightedSkill, setHighlightedSkill] = useState(null);

    useEffect(() => {
        let biggest = characterDictionary['magic'];
        biggest = biggest.toString();
        for (const key in skills) {
            if (skills[key][characterDictionary['level']] > skills[biggest][characterDictionary['level']]) {
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
                        Level {level} - {level >= 20 ? vocationEnum[vocationId] : vocationEnum['1' + vocationId]}
                    </div>
                </div>
            </div>

            <div className="overview">
                <LabeledText label="Server" warning={currentServer.experimental} warningText="This is an experimental server!">
                    <div className="overview-content row">
                        <img
                            className="flag"
                            alt={currentServer.serverLocation.string}
                            title={currentServer.serverLocation.string}
                            src={getFlag(currentServer.serverLocation.type)}
                        />
                        {currentServer.serverName}
                    </div>
                </LabeledText>

                <LabeledText label="PvP">
                    <div className="overview-content row">
                        <span
                            className="battleye"
                            style={{ backgroundColor: `${currentServer.battleye ? 'var(--battleGreen)' : 'var(--battleYellow)'}` }}
                        >
                        </span>
                        {currentServer.pvpType.string}
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
                    {makeItemImg(items)}
                </div>
            </div>

            <div className="card-footer">
                <div className="skills-wrapper">
                    {Object.keys(skills).map(skillItem => {
                        return (
                            <SkillBar
                                key={characterDictionary[skillItem]}
                                skillName={characterDictionary[skillItem]}
                                skill={skills[skillItem]}
                                highlight={skillItem === highlightedSkill}
                            />
                        )
                    })}
                </div>

                {charms.length > 0
                    ? <div className="charms-wrapper">
                        {charms.map(charmItem => <Tag key={charmDictionary[charmItem]}>{charmDictionary[charmItem]}</Tag>)}
                    </div>
                    : null
                }
            </div>
        </CharCard>
    )
}

const makeItemImg = (itemArray) => {
    const elementArray = [];
    for(const item of itemArray) {
        elementArray.push(<ImagePortrait src={`https://static.tibia.com/images/charactertrade/objects/${item}.gif`} />);
    }

    while(elementArray.length < 4) {
        elementArray.push(<ImagePortrait />);
    }

    return elementArray;
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