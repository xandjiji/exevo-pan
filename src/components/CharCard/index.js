import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CharCard from './CharCard.styled';

import { AuctionTimer, Chip, SkillBar, FavButton, SpritePortrait, LabeledTextBox, Popover } from 'components/Atoms';
import InformationBadge from '../InformationBadge';

import ServerDataContext from '../../contexts/ServerData/context';

import { ReactComponent as ExternalIcon } from '../../assets/svgs/external.svg';
import { ReactComponent as Server } from '../../assets/svgs/server.svg';
import { ReactComponent as NoServer } from '../../assets/svgs/noserver.svg';
import { ReactComponent as Magic } from '../../assets/svgs/magic.svg';
import BrFlag from '../../assets/br-flag.png';
import EuFlag from '../../assets/eu-flag.png';
import NaFlag from '../../assets/na-flag.png';
import TibiaCoinIcon from '../../assets/tibiacoin.png';

import formatNumberWithCommas from '../../utils/formatNumberWithCommas';

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
    const { pathname } = useLocation();

    const { indexedServerData } = useContext(ServerDataContext);

    const {
        id,
        nickname,
        outfitId,
        currentBid,
        hasBeenBidded,
        auctionEnd,
        level,
        vocationId,
        serverId,
        skills,
        items,
        charms,
        transfer,
        imbuements
    } = charData;

    const currentServer = indexedServerData[serverId];
    if (!currentServer) return null;

    const [highlightedSkill, setHighlightedSkill] = useState(null);

    useEffect(() => {
        let biggest = 'magic';
        for (const skillItem in skills) {
            if (skills[skillItem] > skills[biggest]) {
                biggest = skillItem;
            }
        }

        setHighlightedSkill(biggest);
    }, [skills]);

    const getBidLabelText = () => {
        if (pathname === '/bazaar-history') {
            return hasBeenBidded ? 'Auction Successful' : 'Auction Failed';
        } else {
            return hasBeenBidded ? 'Current Bid' : 'Minimum Bid';
        }
    }

    if (Object.keys(indexedServerData).length === 0) return null;

    return (
        <CharCard className="shadow">
            <div className="card-head">
                <SpritePortrait
                    src={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
                    alt={nickname}
                    title={nickname}
                    width={64}
                    height={64}
                    style={{ marginLeft: '-24px', marginTop: '-24px' }}
                />
                <div className="head-info">
                    <p className="nickname">
                        {nickname}
                        <a href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${id}&source=overview`} target="_blank" rel="noreferrer">
                            <ExternalIcon className="clickable" />
                            Go to character page
                        </a>
                    </p>
                    <div className="level-vocation">
                        Level {level} - {level >= 20 ? vocationEnum[vocationId] : vocationEnum['1' + vocationId]}
                    </div>
                </div>
                <FavButton className="fav-button" characterObject={charData} />
            </div>

            <div className="overview">
                <LabeledTextBox labelText="Server" warning={currentServer.experimental} title="This is an experimental server!">
                    <div className="server-info overview-content row">
                        <span className="server-text">
                            <img
                                className="flag"
                                alt={currentServer.serverLocation.string}
                                title={currentServer.serverLocation.string}
                                src={getFlag(currentServer.serverLocation.type)}
                                width={16}
                                height={10}
                            />
                            {currentServer.serverName}
                        </span>
                        {transfer ?
                            <InformationBadge icon={<Server />} text="Regular World transfer available" />
                            :
                            <InformationBadge icon={<NoServer />} text="Regular World transfer NOT available" />
                        }
                    </div>
                </LabeledTextBox>

                <LabeledTextBox labelText="PvP">
                    <div className="overview-content row">
                        <span
                            className="battleye"
                            style={{ backgroundColor: `${currentServer.battleye ? 'var(--battleGreen)' : 'var(--battleYellow)'}` }}
                        >
                        </span>
                        {currentServer.pvpType.string}
                    </div>
                </LabeledTextBox>

                <LabeledTextBox labelText="Auction End">
                    <div className="overview-content auction">
                    <Popover
                        content={
                            <div>
                                <p>CONTENT TESTE</p>
                                <p>CONTENT TESTE</p>
                            </div>
                        }
                        
                        trigger="hover"
                    >
                        <AuctionTimer endDate={new Date(auctionEnd * 1000)} />
                    </Popover>
                    </div>
                </LabeledTextBox>

                <LabeledTextBox labelText={getBidLabelText()}>
                    <div className="overview-content row bid">
                        <img
                            className="coin"
                            alt="Tibia Coin"
                            src={TibiaCoinIcon}
                            width={12}
                            height={12}
                        />
                        {formatNumberWithCommas(currentBid)}
                    </div>
                </LabeledTextBox>

                <div className="item-wrapper">
                    {makeItemImg(items)}
                </div>
            </div>

            <div className="card-footer">
                <div className="skills-wrapper">
                    {Object.keys(skills).map(skillItem => {
                        return (
                            <SkillBar
                                key={skillItem}
                                skillName={skillItem}
                                skillValue={skills[skillItem]}
                                highlight={skillItem === highlightedSkill}
                            />
                        )
                    })}
                </div>

                <InformationBadge
                    className="imbuement-wrapper"
                    icon={
                        <>
                            <Magic />
                            {`Imbuements: ${imbuements ? imbuements.length : 0}/23`}
                        </>
                    }
                    text={imbuements && imbuements.length > 0 ?
                        imbuements.map((imbuementItem, index) =>
                            <span key={index} className={highlightImbuentClass(imbuementItem)}>
                                {imbuementItem}
                            </span>)
                        : null
                    }
                />

                {charms && charms.length > 0 ?
                    <div className="charms-wrapper">
                        {charms.map(charmItem => <Chip key={charmItem}>{charmItem}</Chip>)}
                    </div>
                    : null
                }
            </div>
        </CharCard>
    )
}

const makeItemImg = (itemArray) => {
    const elementArray = [];

    if (itemArray) {
        for (const item of itemArray) {
            elementArray.push(<SpritePortrait key={item} alt="Featured item" src={`https://static.tibia.com/images/charactertrade/objects/${item}.gif`} />);
        }
    }

    while (elementArray.length < 4) {
        elementArray.push(<SpritePortrait key={elementArray.length} alt="No item" />);
    }

    return elementArray;
}

const highlightImbuentClass = (imbuementString) => {
    const highlightArray = [
        'Critical Hit',
        'Life Leech',
        'Mana Leech',
        'Magic Level',
        'Sword Skill',
        'Axe Skill',
        'Club Skill',
        'Distance Skill'
    ]

    if (highlightArray.includes(imbuementString)) return 'highlight'
    return '';
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