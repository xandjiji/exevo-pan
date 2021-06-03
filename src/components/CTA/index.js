import React from 'react';
import { Button, Img } from './CTA.styled';

import coinsGif from '../../assets/tibiaCoins.gif';

export default ({ ...props }) => {
    return (
        <Button
            className="clickable shadow"
            href="https://www.reidoscoins.com.br/?tracking=60b8120a1ab43"
            target="_blank"
            rel="external"
            {...props}
        >
            <Img
                src={coinsGif}
                alt="Tibia Coins"
            />
            Buy Tibia Coins
        </Button>
    );
}
