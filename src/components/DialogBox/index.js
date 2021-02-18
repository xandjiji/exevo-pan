import React from 'react';
import { Wrapper, Background } from './DialogBox.styled';

export default ({ children, className, isOpen, onClose, setState }) => {

    const handleBackgroundClick = () => {
        onClose?.();
        setState(false);
    }
    return (
        <Wrapper className={`${isOpen ? 'visible' : ''} ${className}`}>
            {children}
            <Background onClick={handleBackgroundClick} />
        </Wrapper>
    );
}