import React, { useState, memo } from 'react';
import Chip from './Chip.styled';

export default memo(({ children, clickable, onClick, closeable, onClose }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        if (clickable) {
            setActive(!active);
            if (onClick) onClick();
        }
    }

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