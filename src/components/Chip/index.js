import React, { useState, useEffect, memo } from 'react';
import Chip from './Chip.styled';

export default memo(({ children, clickable, onClick, closeable, onClose, overrideStatus }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        if (clickable) {
            if(overrideStatus === undefined) setActive(!active);
            if (onClick) onClick();
        }
    }

    useEffect(() => {
        setActive(overrideStatus);
    }, [overrideStatus])

    return (
        <Chip className={`chip-item shadow ${active ? 'active' : ''} ${clickable ? 'interact' : ''}`} onClick={handleClick}>
            {children}
            {closeable ?
                <div
                    className="close-button clickable"
                    onClick={onClose}
                    role="button"
                    tabIndex="0"
                    aria-label="Remove item"
                >
                </div>
                : null
            }
        </Chip>
    )
});