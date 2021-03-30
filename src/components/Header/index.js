import React from 'react';
import Header, { HeaderItem } from './Header.styled';

export default ({ children }) => {

    console.log(children);

    return (
        <Header className="inner-container">
            <nav>
                <ul>
                    {children.map(item => <HeaderItem>{item}</HeaderItem>)}
                </ul>
            </nav>
        </Header>
    )
}