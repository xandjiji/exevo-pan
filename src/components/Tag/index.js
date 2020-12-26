import React, { useState } from 'react';
import Tag from './Tag.styled';

export default ({ children, clickable }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        if(clickable) setActive(!active);
    }

    return (
        <Tag className={`tag-item shadow ${active ? 'active' : ''}`} onClick={handleClick}>
            {children}
        </Tag>
    )
}