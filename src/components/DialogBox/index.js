import React from 'react';
import { Wrapper, Background, DialogBox } from './DialogBox.styled';

export default ({ children, className, isOpen, onClose, onBackgroundClick }) => {

    const handleBackgroundClick = () => {
        onClose?.();
        onBackgroundClick?.();
    }

    return (
        <Wrapper className={`${isOpen ? 'visible' : ''} ${className}`}>
            <DialogBox>
                {children}
            </DialogBox>
            <Background className="dialog-background" onClick={handleBackgroundClick} />
        </Wrapper>
    );
}