import React, { memo } from 'react';
import InformationBadge from './InformationBadge.styled';

export default memo(({ className, icon, text, color }) => {
    return (
        <InformationBadge className={className} color={color}>
            {icon}
            {text ? <div className="shadow">{text}</div> : null}
        </InformationBadge>
    )
});