import React, { useState, useEffect } from 'react';
import AuctionTimer from './AuctionTimer.styled';

const monthStr = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Set', 'Oct', 'Nov', 'Dec'];
const constantTime = 1000 * 60;
const constantTime2 = constantTime * 60;

export default ({ endDate }) => {
    const [countdown, setCountdown] = useState(getInitialDate(endDate));

    useEffect(() => {
        const { days, hours, minutes, seconds } = countdown;

        if (hours < 24) {
            if (seconds - 1 >= 0) {
                const timeout = setTimeout(() => setCountdown({ ...countdown, seconds: seconds - 1 }), 1000)
                return () => clearTimeout(timeout);
            } else if (minutes - 1 >= 0) {
                const timeout = setTimeout(() => setCountdown({ ...countdown, minutes: minutes - 1, seconds: 59 }), 1000)
                return () => clearTimeout(timeout);
            } else if (hours - 1 >= 0) {
                const timeout = setTimeout(() => setCountdown({ hours: hours - 1, minutes: 59, seconds: 59 }), 1000)
                return () => clearTimeout(timeout);
            } else if (days - 1 >= 0) {
                const timeout = setTimeout(() => setCountdown({ days: days - 1, hours: 23, minutes: 59, seconds: 59 }), 1000)
                return () => clearTimeout(timeout);
            }
        }


    }, [countdown]);

    const { days, hours, minutes, seconds } = countdown;

    const endTime = `, ${endDate.getHours()}:${endDate.getMinutes() > 10 ? endDate.getMinutes() : `0${endDate.getMinutes()}`}`;

    let auctionEndMessage;
    if (days > 0) {
        auctionEndMessage =
            <>
                <span>
                    {`${endDate.getDate()} ${monthStr[endDate.getMonth()]}`}
                </span>
                {endTime}
            </>
    } else if (hours > 0) {
        auctionEndMessage =
            <>
                <span className="red">
                    {`${hours}h ${minutes}m`}
                </span>
                {endTime}
            </>
    } else if (minutes + seconds > 0) {
        auctionEndMessage =
            <>
                <span className="red">
                    {`${minutes}m ${seconds}s`}
                </span>
                {endTime}
            </>
    } else {
        auctionEndMessage = <span className="red">Auction Ended!</span>;
    }

    return (
        <AuctionTimer>
            {auctionEndMessage}
        </AuctionTimer>
    )
}

const getInitialDate = (endDate) => {
    const currentDate = new Date();
    let distance = endDate - currentDate;

    const days = Math.floor(distance / (constantTime2 * 24));
    const hours = Math.floor((distance % (constantTime2 * 24)) / constantTime2);
    const minutes = Math.floor((distance % constantTime2) / constantTime);
    const seconds = Math.floor((distance % constantTime) / 1000);

    return { days, hours, minutes, seconds };
}