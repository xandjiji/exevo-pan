import React from 'react';
import Header from './Header.styled';

import SearchIcon from '../../assets/svgs/search.svg';

export default () => {
    return (
        <Header className="shadow inner-container">
            <SearchIcon className="clickable" />
        </Header>
    )
}