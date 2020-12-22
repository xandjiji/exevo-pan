import React from 'react';
import CharCard from './CharCard.styled';
import ImagePortrait from '../ImagePortrait';

const monthStr = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Set', 'Oct', 'Nov', 'Dec'];

export default ({ charData }) => {
    const {
        nickname,
        href,
        currentBid,
        hasBeenBidded,
        auctionEnd,
        level,
        vocation
    } = charData;
    const endDate = new Date(auctionEnd * 1000);

    return (
        <CharCard>
            <div className="card-head">
                <ImagePortrait src="https://static.tibia.com/images/charactertrade/outfits/130_1.gif" alt={nickname} />
                <div className="head-info">
                    <p className="nickname">{nickname}</p>
                    <div className="level-vocation">
                        Level {level} - {vocation}
                    </div>
                </div>
            </div>
            <p>Auction End: {monthStr[endDate.getMonth()]} {endDate.getDate()} {endDate.getFullYear()}, {endDate.getHours()}:{endDate.getMinutes() > 10 ? endDate.getMinutes() : `0${endDate.getMinutes()}`}</p>
            <p>{hasBeenBidded ? 'Current' : 'Minimum'} Bid: {currentBid}</p>
        </CharCard>
    )
}