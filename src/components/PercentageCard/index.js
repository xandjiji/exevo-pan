import React from 'react';
import { Wrapper, Title, Percentage } from './PercentageCard.styled';

export default ({ label, value }) => {

    return (
        <Wrapper>
            <Title>{label}</Title>
            <Percentage positive={value >= 50}>{value}%</Percentage>
        </Wrapper>
    )
}