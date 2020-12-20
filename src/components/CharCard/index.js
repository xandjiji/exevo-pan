import React from 'react';
const monthStr = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Set', 'Oct', 'Nov', 'Dec'];

const CharCard = ({ charData }) => {
    const { nickname, href, currentBid, hasBeenBidded, auctionEnd } = charData;
    const endDate = new Date(auctionEnd * 1000);

    return (
        <div>
            <a href={href} target="_blank" rel="noreferrer">{nickname}</a>
            <p>Auction End: {monthStr[endDate.getMonth()]} {endDate.getDate()} {endDate.getFullYear()}, {endDate.getHours()}:{endDate.getMinutes() > 10 ? endDate.getMinutes() : `0${endDate.getMinutes()}`}</p>
            <p>{hasBeenBidded ? 'Current' : 'Minimum'} Bid: {currentBid}</p>
        </div>
    )
}

export default CharCard;