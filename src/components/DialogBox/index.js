import React from 'react';
import { Wrapper, Background } from './DialogBox.styled';

export default ({ children, isOpen, onClose, setState }) => {

    const handleBackgroundClick = () => {
        onClose?.();
        setState(false);
    }
    return (
        <Wrapper className={`${isOpen ? 'visible' : ''}`}>
            {children}
            <Background onClick={handleBackgroundClick} />
        </Wrapper>
    );
}