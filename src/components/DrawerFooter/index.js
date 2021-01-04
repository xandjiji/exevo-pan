import React from 'react';
import DrawerFooter from './DrawerFooter.styled';

import { ReactComponent as GithubIcon } from '../../assets/svgs/github.svg';

export default () => {
    return (
        <DrawerFooter className="inner-container">
            <a href="https://github.com/xandjiji/exevo-pan" target="_blank" rel="noreferrer">
                <GithubIcon className="clickable" />
            </a>
            made by <a className="gituser" href="https://github.com/xandjiji" target="_blank" rel="noreferrer">xandjiji</a>
        </DrawerFooter>
    )
}