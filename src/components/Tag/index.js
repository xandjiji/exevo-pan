import React, { useState } from 'react';
import Tag from './Tag.styled';

export default ({ children, clickable, onClick }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        if(clickable) {
            setActive(!active);
            if(onClick) onClick();
        }
    }

    return (
        <Tag className={`tag-item shadow ${active ? 'active' : ''} ${clickable ? 'interact' : null}`} onClick={handleClick}>
            {children}
        </Tag>
    )
}