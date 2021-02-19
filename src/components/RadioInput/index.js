import React, { memo } from 'react';
import { RadioInput } from './RadioInput.styled';

export default memo(({ children, active, onClick }) => {
    return(
        <RadioInput className={`${active ? 'active' : ''}`} onClick={onClick}>
            <div className="radio"></div>
            {children}
        </RadioInput>
    )
});